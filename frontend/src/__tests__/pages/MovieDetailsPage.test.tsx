import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

const mockUseParams = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(typeof actual === 'object' && actual !== null ? actual : {}),
    useParams: () => mockUseParams(),
  };
});

const mockGetMovieById = vi.fn();
const mockFavoriteMovies: { id: string }[] = [];
const mockAddToFavorites = vi.fn((id: string) => mockFavoriteMovies.push({ id }));
const mockRemoveFromFavorites = vi.fn((id: string) => {
  const index = mockFavoriteMovies.findIndex(m => m.id === id);
  if (index > -1) mockFavoriteMovies.splice(index, 1);
});
const mockAddToWatched = vi.fn();

vi.mock('../../contexts/MovieContext', () => ({
  useMovies: () => ({
    getMovieById: mockGetMovieById,
    favoriteMovies: mockFavoriteMovies,
    addToFavorites: mockAddToFavorites,
    removeFromFavorites: mockRemoveFromFavorites,
    addToWatched: mockAddToWatched,
  }),
}));

const mockConsoleLog = vi.fn();
console.log = mockConsoleLog;

import MovieDetailsPage from '../../pages/MovieDetailsPage';

vi.mock('../../components/CommentForm', () => ({
  default: ({ onSubmit }: { onSubmit: (comment: string) => void }) => (
    <form data-testid="comment-form" onSubmit={(e) => { e.preventDefault(); onSubmit('Test Comment'); }}>
      <input type="text" placeholder="Adicionar comentário" />
      <button type="submit">Enviar Comentário Mock</button>
    </form>
  ),
}));

const MockHomePage = () => {
  return <h1>Home Page</h1>;
};

const MockApp = () => (
  <Routes>
    <Route path="/filme/:id" element={<MovieDetailsPage />} />
    <Route path="/" element={<MockHomePage />} />
  </Routes>
);

beforeEach(() => {
  vi.clearAllMocks();
  mockFavoriteMovies.length = 0;
  mockUseParams.mockReturnValue({ id: '1' });
});

const mockMovie = {
  id: '1',
  title: 'Filme Teste',
  image: 'http://example.com/movie.jpg',
  rating: 8.5,
  genre: 'Ação',
  director: 'Diretor Teste',
  duration: '150 min',
  description: 'Descrição do filme teste.',
};

test("deve exibir os detalhes do filme corretamente", async () => {
  mockGetMovieById.mockReturnValue(mockMovie);

  render(
    <MemoryRouter initialEntries={["/filme/1"]}>
      <MockApp />
    </MemoryRouter>
  );

  expect(screen.getByText('Filme Teste')).toBeInTheDocument();
  expect(screen.getByAltText('Filme Teste')).toHaveAttribute('src', 'http://example.com/movie.jpg');
  expect(screen.getByText('⭐ 8.5')).toBeInTheDocument();

  const genreElement = screen.getByText('Gênero:', { selector: 'strong' });
  expect(genreElement.closest('p')).toHaveTextContent('Gênero: Ação');

  const directorElement = screen.getByText('Diretor:', { selector: 'strong' });
  expect(directorElement.closest('p')).toHaveTextContent('Diretor: Diretor Teste');

  const durationElement = screen.getByText('Duração:', { selector: 'strong' });
  expect(durationElement.closest('p')).toHaveTextContent('Duração: 150 min');

  expect(screen.getByText('Descrição do filme teste.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Assistir/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Adicionar aos Favoritos/i })).toBeInTheDocument();
});

test("deve exibir 'Filme não encontrado' se o filme não for encontrado", async () => {
  mockGetMovieById.mockReturnValue(undefined);
  mockUseParams.mockReturnValue({ id: '999' });

  render(
    <MemoryRouter initialEntries={["/filme/999"]}>
      <MockApp />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: /Filme não encontrado/i })).toBeInTheDocument();
});

test("deve adicionar o filme aos favoritos", async () => {
  mockGetMovieById.mockReturnValue(mockMovie);
  mockFavoriteMovies.length = 0;

  render(
    <MemoryRouter initialEntries={["/filme/1"]}>
      <MockApp />
    </MemoryRouter>
  );

  const favoriteButton = screen.getByRole('button', { name: /Adicionar aos Favoritos/i });
  expect(favoriteButton).toBeInTheDocument();

  fireEvent.click(favoriteButton);

  await waitFor(() => {
    expect(mockAddToFavorites).toHaveBeenCalledTimes(1);
    expect(mockAddToFavorites).toHaveBeenCalledWith(mockMovie.id);
  });
});

test("deve remover o filme dos favoritos", async () => {
  mockGetMovieById.mockReturnValue(mockMovie);
  mockFavoriteMovies.push({ id: mockMovie.id });

  render(
    <MemoryRouter initialEntries={["/filme/1"]}>
      <MockApp />
    </MemoryRouter>
  );

  const favoriteButton = screen.getByRole('button', { name: /Remover dos Favoritos/i });
  expect(favoriteButton).toBeInTheDocument();

  fireEvent.click(favoriteButton);

  await waitFor(() => {
    expect(mockRemoveFromFavorites).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromFavorites).toHaveBeenCalledWith(mockMovie.id);
  });
});

test("deve adicionar o filme ao histórico de assistidos", async () => {
  mockGetMovieById.mockReturnValue(mockMovie);

  render(
    <MemoryRouter initialEntries={["/filme/1"]}>
      <MockApp />
    </MemoryRouter>
  );

  const watchButton = screen.getByRole('button', { name: /Assistir/i });
  fireEvent.click(watchButton);

  await waitFor(() => {
    expect(mockAddToWatched).toHaveBeenCalledTimes(1);
    expect(mockAddToWatched).toHaveBeenCalledWith(mockMovie.id);
    expect(mockConsoleLog).toHaveBeenCalledWith('Filme adicionado ao histórico');
  });
});

test("deve submeter um comentário", async () => {
  mockGetMovieById.mockReturnValue(mockMovie);

  render(
    <MemoryRouter initialEntries={["/filme/1"]}>
      <MockApp />
    </MemoryRouter>
  );

  const commentSubmitButton = screen.getByRole('button', { name: /Enviar Comentário Mock/i });
  fireEvent.click(commentSubmitButton);

  await waitFor(() => {
    expect(mockConsoleLog).toHaveBeenCalledWith('Novo comentário:', 'Test Comment');
  });
});
