import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { vi } from "vitest";
import React from 'react';
import userEvent from "@testing-library/user-event";

const mockUseNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: () => mockUseNavigate,
  };
});

const mockConsoleLog = vi.fn();
console.log = mockConsoleLog;

vi.mock('../../components/MovieCard', () => {
  function MockMovieCard({ id, title, image, rating, onClick, showFavoriteButton }: { id: string; title: string; image: string; rating: number; onClick?: () => void; showFavoriteButton?: boolean; }) {
    const navigate = useNavigate();

    const handleClick = () => {
      if (onClick) {
        onClick();
      }
      navigate(`/filme/${id}`);
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

const initialWatchedMovies = [
  { id: '1', title: 'Filme Histórico 1', image: 'hist1.jpg', rating: 7.8 },
  { id: '2', title: 'Filme Histórico 2', image: 'hist2.jpg', rating: 9.0 },
];
let currentWatchedMovies: { id: string; title: string; image: string; rating: number; }[] = [];

const mockRemoveFromWatched = vi.fn((id: string) => {
  currentWatchedMovies = currentWatchedMovies.filter(movie => movie.id !== id);
});

vi.mock('../../contexts/MovieContext', () => ({
  useMovies: () => {
    const [watchedMoviesState, setWatchedMoviesState] = React.useState(currentWatchedMovies);

    const removeFromWatchedLocalMock = (id: string) => {
      mockRemoveFromWatched(id);
      const updatedMovies = watchedMoviesState.filter(movie => movie.id !== id);
      setWatchedMoviesState(updatedMovies);
      currentWatchedMovies = updatedMovies;
    };

    return {
      watchedMovies: watchedMoviesState,
      removeFromWatched: removeFromWatchedLocalMock,
    };
  },
}));

const mockUser = vi.fn();
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: mockUser(),
  }),
}));

import HistoryPage from '../../pages/HistoryPage';



const MockApp = ({ initialEntries = ['/history'], userState = null }: { initialEntries?: string[]; userState?: object | null; }) => {
  mockUser.mockReturnValue(userState);
  return (
    <MemoryRouter initialEntries={initialEntries}> <Routes>
        <Route path="/history" element={<HistoryPage />} />
        
        <Route path="/login" element={<div>Página de Login</div>} />
      </Routes>
    </MemoryRouter>
  );
};

beforeEach(() => {
  vi.clearAllMocks();
  currentWatchedMovies = [...initialWatchedMovies]; 
  mockUser.mockReturnValue({ uid: 'test-user-id' });
});

const watchedMovie1 = { id: '1', title: 'Filme Histórico 1', image: 'hist1.jpg', rating: 7.8 };
const watchedMovie2 = { id: '2', title: 'Filme Histórico 2', image: 'hist2.jpg', rating: 9.0 };

test("deve exibir filmes assistidos se o usuário estiver logado e houver filmes", async () => {
  currentWatchedMovies = [watchedMovie1, watchedMovie2];

  render(<MockApp userState={{ uid: 'test-user-id' }} />);

  expect(screen.getByText('Histórico de Filmes')).toBeInTheDocument();
  expect(screen.getByText('Filme Histórico 1')).toBeInTheDocument();
  expect(screen.getByText('Filme Histórico 2')).toBeInTheDocument();
  expect(screen.getByText('7.8')).toBeInTheDocument();
  expect(screen.getByText('9.0')).toBeInTheDocument();
  expect(screen.getByAltText('Filme Histórico 1')).toHaveAttribute('src', 'hist1.jpg');
});

test("deve exibir mensagem de estado vazio se não houver filmes assistidos", async () => {
  currentWatchedMovies = [];

  render(<MockApp userState={{ uid: 'test-user-id' }} />);

  expect(screen.getByText('Histórico de Filmes')).toBeInTheDocument();
  expect(screen.getByText('Você ainda não assistiu nenhum filme.')).toBeInTheDocument();
  expect(screen.getByText('Comece a explorar nosso catálogo!')).toBeInTheDocument();
  expect(screen.queryByText('Filme Histórico 1')).not.toBeInTheDocument();
});

test("deve chamar handleMovieClick e navegar ao clicar no card de um filme assistido", async () => {
  const user = userEvent.setup();
  currentWatchedMovies = [watchedMovie1];

  render(<MockApp userState={{ uid: 'test-user-id' }} />);

  const movieCard = screen.getByTestId('movie-card-1');
  await user.click(movieCard);

  expect(mockConsoleLog).toHaveBeenCalledTimes(1);
  expect(mockConsoleLog).toHaveBeenCalledWith('Clicou no filme do histórico:', '1');

  
});

test("deve remover o filme do histórico ao clicar no botão '✕'", async () => {
  currentWatchedMovies = [watchedMovie1];

  render(<MockApp userState={{ uid: 'test-user-id' }} />);

  expect(screen.getByText('Filme Histórico 1')).toBeInTheDocument();

  const removeButton = screen.getByRole('button', { name: '✕' });
  fireEvent.click(removeButton);

  await waitFor(() => {
    expect(mockRemoveFromWatched).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromWatched).toHaveBeenCalledWith(watchedMovie1.id);
    
    expect(screen.queryByText('Filme Histórico 1')).not.toBeInTheDocument();
    expect(screen.getByText('Você ainda não assistiu nenhum filme.')).toBeInTheDocument();
  });
});

test("deve exibir mensagem de 'precisa estar logado' se o usuário não estiver autenticado", async () => {
  mockUser.mockReturnValue(null);

  render(<MockApp userState={null} />);

  expect(screen.getByText('Você precisa estar logado para ver seu histórico.')).toBeInTheDocument();
  expect(screen.queryByText('Histórico de Filmes')).toBeInTheDocument();
  expect(screen.queryByText('Filme Histórico 1')).not.toBeInTheDocument();
});
