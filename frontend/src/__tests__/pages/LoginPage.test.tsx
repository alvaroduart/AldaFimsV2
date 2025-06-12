import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

const mockLogin = vi.fn();
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

const mockUseNavigate = vi.fn();
const mockUseLocation = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: () => mockUseNavigate,
    useLocation: () => mockUseLocation(),
  };
});

const mockAlert = vi.fn();
window.alert = mockAlert;
console.error = vi.fn();

import LoginPage from '../../pages/LoginPage';

const MockHomePage = () => {
  return (
    <div>
      <h1>Welcome Home!</h1>
      <h2>Post 1</h2>
      <p>Conteúdo da página inicial mockada.</p>
    </div>
  );
};

const MockApp = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<MockHomePage />} />
    <Route path="/dashboard" element={<h2>Dashboard Page</h2>} />
  </Routes>
);

beforeEach(() => {
  vi.clearAllMocks();
  mockUseLocation.mockReturnValue({ state: null });
});

test("deve permitir login de usuário e navegar para a home page", async () => {
  mockLogin.mockResolvedValueOnce(undefined);

  render(
    <MemoryRouter initialEntries={["/login"]}>
      <MockApp />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/E-mail/i), {
    target: { value: "teste@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Senha/i), {
    target: { value: "minhasenha123" },
  });
  fireEvent.click(screen.getByLabelText(/Lembrar-me/i));

  fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith("teste@example.com", "minhasenha123", true);
  });

  await waitFor(() => {
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/", { replace: true });
  });
});

test("deve permitir login de usuário e navegar para o estado 'from'", async () => {
  mockLogin.mockResolvedValueOnce(undefined);
  mockUseLocation.mockReturnValue({ state: { from: { pathname: '/dashboard' } } });

  render(
    <MemoryRouter initialEntries={[{ pathname: "/login", state: { from: { pathname: '/dashboard' } } }]}>
      <MockApp />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/E-mail/i), {
    target: { value: "teste@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Senha/i), {
    target: { value: "minhasenha123" },
  });

  fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith("teste@example.com", "minhasenha123", false);
  });

  await waitFor(() => {
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/dashboard", { replace: true });
  });
});

test("deve exibir erro quando o login falha", async () => {
  mockLogin.mockRejectedValueOnce(new Error("Credenciais inválidas"));

  render(
    <MemoryRouter initialEntries={["/login"]}>
      <MockApp />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/E-mail/i), {
    target: { value: "email_invalido@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Senha/i), {
    target: { value: "senha_errada" },
  });

  fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  await waitFor(() => {
    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith("Erro no login. Verifique suas credenciais.");
  });

  expect(mockUseNavigate).not.toHaveBeenCalled();
});
