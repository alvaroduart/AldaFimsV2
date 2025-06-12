import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import MovieCard from "../../components/MovieCard";

it("deve exibir as informações do filme e navegar ao clicar", async () => {
  const handleClickMock = vi.fn();
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <MovieCard
        id="123"
        title="Filme Teste"
        image="test-image.jpg"
        rating={8.5}
        onClick={handleClickMock}
      />
    </BrowserRouter>
  );

  expect(screen.getByText("Filme Teste")).toBeInTheDocument();
  expect(screen.getByAltText("Filme Teste")).toHaveAttribute("src", "test-image.jpg");
  expect(screen.getByText("8.5")).toBeInTheDocument();
  expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();

  const movieCard = screen.getByText("Filme Teste").closest('a');
  expect(movieCard).toHaveAttribute("href", "/filme/123");

  await user.click(movieCard!);
  expect(handleClickMock).toHaveBeenCalledTimes(1);
});