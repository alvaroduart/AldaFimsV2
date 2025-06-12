import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import RegisterPage from "../../pages/RegisterPage";

// --- Mocks globais ---

const mockUseNavigate = vi.fn();
const mockAlert = vi.fn();
const mockRegister = vi.fn();

window.alert = mockAlert;

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockUseNavigate,
  };
});

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    register: mockRegister,
  }),
}));

// --- Componentes auxiliares para rota ---

const MockHomePage = () => (
  <>
    <h1>Welcome Home!</h1>
    <h2>Post 1</h2>
    <p>Conteúdo da página inicial mockada.</p>
  </>
);

const renderWithRouter = () =>
  render(
    <MemoryRouter initialEntries={["/register"]}>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<MockHomePage />} />
      </Routes>
    </MemoryRouter>
  );

// --- Testes ---

describe("RegisterPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("deve permitir registro de usuário e navegar para a home page", async () => {
    mockRegister.mockResolvedValueOnce(undefined);
    const user = userEvent.setup();

    renderWithRouter();

    await user.type(screen.getByPlaceholderText(/Nome Completo/i), "Usuário Teste");
    await user.type(screen.getByPlaceholderText(/E-mail/i), "teste@example.com");
    await user.type(screen.getByPlaceholderText(/^Senha$/i), "123456");
    await user.type(screen.getByPlaceholderText(/Confirmar Senha/i), "123456");

    await user.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledTimes(1);
      expect(mockRegister).toHaveBeenCalledWith("Usuário Teste", "teste@example.com", "123456");
      expect(mockAlert).toHaveBeenCalledWith("Cadastro realizado com sucesso!");
      expect(mockUseNavigate).toHaveBeenCalledWith("/");
    });

    
  });

  test("deve exibir erro quando as senhas não batem", async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.type(screen.getByPlaceholderText(/Nome Completo/i), "Usuário Teste");
    await user.type(screen.getByPlaceholderText(/E-mail/i), "teste@example.com");
    await user.type(screen.getByPlaceholderText(/^Senha$/i), "123456");
    await user.type(screen.getByPlaceholderText(/Confirmar Senha/i), "diferente");

    await user.click(screen.getByRole("button", { name: /Cadastrar/i }));

    expect(mockRegister).not.toHaveBeenCalled();

    

    expect(mockUseNavigate).not.toHaveBeenCalled();
  });

  test("deve exibir erro quando o registro falha na autenticação", async () => {
    mockRegister.mockRejectedValueOnce(new Error("Erro de autenticação"));
    const user = userEvent.setup();

    renderWithRouter();

    await user.type(screen.getByPlaceholderText(/Nome Completo/i), "Usuário Teste");
    await user.type(screen.getByPlaceholderText(/E-mail/i), "teste@example.com");
    await user.type(screen.getByPlaceholderText(/^Senha$/i), "123456");
    await user.type(screen.getByPlaceholderText(/Confirmar Senha/i), "123456");

    await user.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledTimes(1);
      expect(mockAlert).toHaveBeenCalledWith("Erro ao realizar cadastro. Tente novamente.");
    });

    expect(mockUseNavigate).not.toHaveBeenCalled();
  });

  test("deve desabilitar o botão e inputs durante o carregamento", async () => {
    // Simula uma promise pendente (nunca resolve)
    mockRegister.mockImplementation(() => new Promise(() => {}));
    const user = userEvent.setup();

    renderWithRouter();

    const nameInput = screen.getByPlaceholderText(/Nome Completo/i);
    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    const passwordInput = screen.getByPlaceholderText(/^Senha$/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/Confirmar Senha/i);
    const submitButton = screen.getByRole("button", { name: /Cadastrar/i });

    await user.type(nameInput, "Usuário Teste");
    await user.type(emailInput, "teste@example.com");
    await user.type(passwordInput, "123456");
    await user.type(confirmPasswordInput, "123456");

    await user.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toHaveTextContent(/Cadastrando/i);
      expect(submitButton).toBeDisabled();
      expect(nameInput).toBeDisabled();
      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
      expect(confirmPasswordInput).toBeDisabled();
    });
  });
});
