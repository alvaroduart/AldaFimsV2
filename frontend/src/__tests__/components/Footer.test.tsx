import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../../components/Footer";
import { vi } from "vitest";

vi.mock('react-router-dom', async () => {
  const actual = await import('react-router-dom');
  return {
    ...actual,
    Link: vi.fn(({ children, to }) => <a href={to}>{children}</a>),
  };
});

it("deve renderizar o conteúdo essencial do rodapé", () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );

  expect(screen.getByAltText("Logo ALDA Films")).toBeInTheDocument();
  expect(screen.getByText(/Sua plataforma de filmes online/i)).toBeInTheDocument();
  expect(screen.getByText(/Assista filmes em qualquer lugar!/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Links Rápidos/i, level: 4 })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Favoritos" })).toHaveAttribute("href", "/favoritos");
  expect(screen.getByRole("link", { name: "Histórico" })).toHaveAttribute("href", "/historico");
  expect(screen.getByRole("link", { name: "Contato" })).toHaveAttribute("href", "/contato");
  expect(screen.getByRole("heading", { name: /Redes Sociais/i, level: 4 })).toBeInTheDocument();
  expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
  expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
  expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
});
