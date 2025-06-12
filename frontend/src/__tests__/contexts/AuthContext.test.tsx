import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import { mockAPI } from "../../mocks";
import { vi } from "vitest";

vi.mock("../../mocks", () => ({
  mockAPI: {
    login: vi.fn(),
    register: vi.fn(),
  },
}));

const TestComponent = () => {
  const { isAuthenticated, login, logout, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  return (
    <div>
      <span>{isAuthenticated ? "Autenticado" : "Não Autenticado"}</span>
      <button onClick={() => login("test@example.com", "password123")}>Entrar</button>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

it("deve permitir login e logout", async () => {
  const mockUser = { id: "u1", name: "User Test" };
  (mockAPI.login as ReturnType<typeof vi.fn>).mockResolvedValue(mockUser);

  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  expect(await screen.findByText("Não Autenticado")).toBeInTheDocument();
  await userEvent.click(screen.getByText("Entrar"));

  expect(await screen.findByText("Autenticado")).toBeInTheDocument();
  expect(mockAPI.login).toHaveBeenCalledWith("test@example.com", "password123");
  expect(localStorage.getItem("isAuthenticated")).toBe("true");
  expect(localStorage.getItem("userData")).toBe(JSON.stringify(mockUser));

  await userEvent.click(screen.getByText("Sair"));
  expect(await screen.findByText("Não Autenticado")).toBeInTheDocument();
  expect(localStorage.getItem("isAuthenticated")).toBeNull();
  expect(localStorage.getItem("userData")).toBeNull();
});