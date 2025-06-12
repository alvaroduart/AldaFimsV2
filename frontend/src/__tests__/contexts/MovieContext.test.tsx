import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MovieProvider, useMovies } from "../../contexts/MovieContext";
import { mockAPI, mockMovies } from "../../mocks";
import { vi } from "vitest";

vi.mock("../../mocks", () => ({
  mockAPI: {
    getMovies: vi.fn(),
  },
  mockMovies: [
    { id: "1", title: "Filme A", genre: "Ação", director: "Dir A", rating: 8.0, image: "img1.jpg" },
    { id: "2", title: "Filme B", genre: "Comédia", director: "Dir B", rating: 7.5, image: "img2.jpg" },
  ],
}));

const TestComponent = () => {
  const { movies, favoriteMovies, addToFavorites, removeFromFavorites, loading } = useMovies();
  if (loading) return <div>Carregando...</div>;
  return (
    <div>
      <span data-testid="movies-count">Filmes: {movies.length}</span>
      <span data-testid="favorites-count">Favoritos: {favoriteMovies.length}</span>
      <button onClick={() => addToFavorites("1")}>Add Fav 1</button>
      <button onClick={() => removeFromFavorites("1")}>Rem Fav 1</button>
    </div>
  );
};

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
  (mockAPI.getMovies as jest.Mock).mockResolvedValue(mockMovies);
});

it("should add and remove favorites correctly", async () => {
  render(
    <MovieProvider>
      <TestComponent />
    </MovieProvider>
  );

  await waitFor(() => {
    expect(screen.getByTestId("movies-count")).toHaveTextContent("Filmes: 2");
  });
  expect(screen.getByTestId("favorites-count")).toHaveTextContent("Favoritos: 0");

  await userEvent.click(screen.getByText("Add Fav 1"));
  expect(screen.getByTestId("favorites-count")).toHaveTextContent("Favoritos: 1");
  expect(localStorage.getItem('favoriteMovies')).toBe(JSON.stringify(["1"]));

  await userEvent.click(screen.getByText("Rem Fav 1"));
  expect(screen.getByTestId("favorites-count")).toHaveTextContent("Favoritos: 0");
  expect(localStorage.getItem('favoriteMovies')).toBe("[]");
});