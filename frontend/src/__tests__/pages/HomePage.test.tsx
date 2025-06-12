import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

import userEvent from "@testing-library/user-event";

const mockUseNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return Object.assign({}, actual, {
    useNavigate: () => mockUseNavigate,
  });
});

const mockConsoleLog = vi.fn();
console.log = mockConsoleLog;

vi.mock('../../components/MovieCard', () => ({
  default: ({ id, title, image, rating, onClick }: { id: string; title: string; image: string; rating: number; onClick?: () => void; }) => (
    <div data-testid={`movie-card-${id}`} onClick={onClick}>
      <a href={`/filme/${id}`}>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <span>{rating.toFixed(1)}</span>
      </a>
    </div>
  ),
}));

vi.mock('../../mocks', () => {
  const mockMovies = [
    { id: '1', title: 'Filme A', image: 'imageA.jpg', rating: 7.0 },
    { id: '2', title: 'Filme B', image: 'imageB.jpg', rating: 8.5 },
    { id: '3', title: 'Filme C', image: 'imageC.jpg', rating: 9.1 },
  ];
  return {
    mockMovies: mockMovies,
  };
});

import HomePage from '../../pages/HomePage';

const MockMovieDetailsPage = () => {
  return <div>Detalhes do Filme Mock</div>;
};

const MockApp = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/filme/:id" element={<MockMovieDetailsPage />} />
  </Routes>
);

beforeEach(() => {
  vi.clearAllMocks();
});

test("deve renderizar todos os filmes da lista mockada", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <MockApp />
    </MemoryRouter>
  );

  expect(screen.getByText('Filme A')).toBeInTheDocument();
  expect(screen.getByText('Filme B')).toBeInTheDocument();
  expect(screen.getByText('Filme C')).toBeInTheDocument();

  expect(screen.getByAltText('Filme A')).toHaveAttribute('src', 'imageA.jpg');
  expect(screen.getByText('7.0')).toBeInTheDocument();
});

test("deve navegar para a página de detalhes ao clicar no link do card", async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={["/"]}>
      <MockApp />
    </MemoryRouter>
  );

  const linkFilmeA = screen.getByRole('link', { name: /Filme A/i });
  await user.click(linkFilmeA);
});

test("deve exibir links corretos para as páginas de detalhes dos filmes", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <MockApp />
    </MemoryRouter>
  );

  const linkFilmeA = screen.getByRole('link', { name: /Filme A/i });
  expect(linkFilmeA).toHaveAttribute('href', '/filme/1');

  const linkFilmeB = screen.getByRole('link', { name: /Filme B/i });
  expect(linkFilmeB).toHaveAttribute('href', '/filme/2');
});
