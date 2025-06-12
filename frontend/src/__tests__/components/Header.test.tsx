import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom"; 
import Header from "../../components/Header";
import { vi } from "vitest";

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: vi.fn(() => ({
    user: null,
    isAuthenticated: false,
    logout: vi.fn(),
  })),
}));


vi.mock('react-icons/fa', () => ({
  FaSearch: () => <svg data-testid="icon-search" />,
  FaFilter: () => <svg data-testid="icon-filter" />,
  FaMoon: () => <svg data-testid="icon-moon" className="fa-moon" />, 
  FaSun: () => <svg data-testid="icon-sun" className="fa-sun" />,   
  FaUser: () => <svg data-testid="icon-user" />,
  FaSignOutAlt: () => <svg data-testid="icon-signout" />,
}));


it("deve renderizar o logo e navegação básica", async () => {
  const user = userEvent.setup();

  
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  
  expect(screen.getByAltText("Logo ALDA Films")).toBeInTheDocument();

  
  expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();

  
  expect(screen.queryByRole("link", { name: "Favoritos" })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "Histórico" })).not.toBeInTheDocument();

  
  expect(screen.getByPlaceholderText(/Pesquisar/i)).toBeInTheDocument();
  expect(screen.getByLabelText("Pesquisar")).toBeInTheDocument();

 
  const themeToggleButton = screen.getByLabelText("Alternar tema");
  
  expect(themeToggleButton.querySelector("svg")).toHaveClass("fa-moon");
    await user.click(themeToggleButton);
    });
