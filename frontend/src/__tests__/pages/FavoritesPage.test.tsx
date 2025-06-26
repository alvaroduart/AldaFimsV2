import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import React from 'react';
import userEvent from "@testing-library/user-event";

const mockUseNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(typeof actual === 'object' && actual !== null ? actual : {}),
    useNavigate: () => mockUseNavigate,
  };
});

const mockConsoleLog = vi.fn();
console.log = mockConsoleLog;

vi.mock('../../components/MovieCard', () => {
  function MockMovieCard({ id, title, image, rating, onClick, showFavoriteButton }: { id: string; title: string; image: string; rating: number; onClick?: () => void; showFavoriteButton?: boolean; }) {
   
    const handleClick = () => {
      if (onClick) {
        onClick();
      }
      
    };

    return (
      <div data-testid={`movie-card-${id}`} onClick={handleClick} style={{ cursor: 'pointer' }}>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <span>{rating.toFixed(1)}</span>
        {showFavoriteButton && <button>Fav</button>}
      </div>
    );
  }
  return { default: MockMovieCard };
});

const initialFavoriteMovies = [
  { id: 'fav1', title: 'Filme Favorito 1', image: 'fav1.jpg', rating: 8.2 },
  { id: 'fav2', title: 'Filme Favorito 2', image: 'fav2.jpg', rating: 7.5 },
];
let currentFavoriteMovies: { id: string; title: string; image: string; rating: number; }[] = [];

const mockRemoveFromFavorites = vi.fn((id: string) => {
  currentFavoriteMovies = currentFavoriteMovies.filter(movie => movie.id !== id);
});

vi.mock('../../contexts/MovieContext', () => ({
  useMovies: () => {
    const [favoriteMoviesState, setFavoriteMoviesState] = React.useState(currentFavoriteMovies);

    const removeFromFavoritesLocalMock = (id: string) => {
      mockRemoveFromFavorites(id);
      const updatedMovies = favoriteMoviesState.filter(movie => movie.id !== id);
      setFavoriteMoviesState(updatedMovies);
      currentFavoriteMovies = updatedMovies;
    };

    return {
      favoriteMovies: favoriteMoviesState,
      removeFromFavorites: removeFromFavoritesLocalMock,
    };
  },
}));

import FavoritesPage from '../../pages/FavoritesPage';



const MockApp = ({ initialEntries = ['/favorites'] }: { initialEntries?: string[]; }) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/favorites" element={<FavoritesPage />} />        
      </Routes>
    </MemoryRouter>
  );
};

beforeEach(() => {
  vi.clearAllMocks();
  currentFavoriteMovies = [...initialFavoriteMovies];
});

const favoriteMovie1 = { id: 'fav1', title: 'Filme Favorito 1', image: 'fav1.jpg', rating: 8.2 };
const favoriteMovie2 = { id: 'fav2', title: 'Filme Favorito 2', image: 'fav2.jpg', rating: 7.5 };

test("deve exibir filmes favoritos se houver filmes na lista", async () => {
  currentFavoriteMovies = [favoriteMovie1, favoriteMovie2];

  render(<MockApp />);

  expect(screen.getByText('Meus Favoritos')).toBeInTheDocument();
  expect(screen.getByText('Filme Favorito 1')).toBeInTheDocument();
  expect(screen.getByText('Filme Favorito 2')).toBeInTheDocument();
  expect(screen.getByText('8.2')).toBeInTheDocument();
  expect(screen.getByText('7.5')).toBeInTheDocument();
  expect(screen.getByAltText('Filme Favorito 1')).toHaveAttribute('src', 'fav1.jpg');
});

test("deve exibir mensagem de estado vazio se não houver filmes favoritos", async () => {
  currentFavoriteMovies = [];

  render(<MockApp />);

  expect(screen.getByText('Meus Favoritos')).toBeInTheDocument();
  expect(screen.getByText('Você ainda não tem filmes favoritos.')).toBeInTheDocument();
  expect(screen.getByText('Explore nosso catálogo e adicione seus filmes preferidos!')).toBeInTheDocument();
  expect(screen.queryByText('Filme Favorito 1')).not.toBeInTheDocument();
});

test("deve chamar handleMovieClick e navegar ao clicar no card de um filme favorito", async () => {
  const user = userEvent.setup();
  currentFavoriteMovies = [favoriteMovie1];

  render(<MockApp />);

  const movieCard = screen.getByTestId('movie-card-fav1');
  await user.click(movieCard);

  expect(mockConsoleLog).toHaveBeenCalledTimes(1);
  expect(mockConsoleLog).toHaveBeenCalledWith('Clicou no filme favorito:', 'fav1');

 

 
});

test("deve remover o filme dos favoritos ao clicar no botão '✕'", async () => {
  currentFavoriteMovies = [favoriteMovie1];

  render(<MockApp />);

  expect(screen.getByText('Filme Favorito 1')).toBeInTheDocument();

  const removeButton = screen.getByRole('button', { name: '✕' });
  fireEvent.click(removeButton);

  await waitFor(() => {
    expect(mockRemoveFromFavorites).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromFavorites).toHaveBeenCalledWith(favoriteMovie1.id);

    expect(screen.queryByText('Filme Favorito 1')).not.toBeInTheDocument();
    expect(screen.getByText('Você ainda não tem filmes favoritos.')).toBeInTheDocument();
  });
});