import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

describe("ForgotPasswordForm", () => {
  const renderComponent = (onSubmit: (email: string) => Promise<void>) => {
    return render(
      <MemoryRouter>
        <ForgotPasswordForm onSubmit={onSubmit} />
      </MemoryRouter>
    );
  };

  it("deve renderizar corretamente o formulário", () => {
    renderComponent(vi.fn());

    expect(screen.getByText(/Esqueceu a Senha\?/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Digite seu e-mail/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enviar Link de Recuperação/i })).toBeInTheDocument();
    expect(screen.getByText(/Voltar para o login/i)).toBeInTheDocument();
  });

  it("deve exibir mensagem de sucesso após envio com sucesso", async () => {
    const mockSubmit = vi.fn().mockResolvedValue(undefined);

    renderComponent(mockSubmit);

    const emailInput = screen.getByPlaceholderText(/Digite seu e-mail/i);
    fireEvent.change(emailInput, { target: { value: "teste@exemplo.com" } });

    const submitButton = screen.getByRole("button", { name: /Enviar Link de Recuperação/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith("teste@exemplo.com");
      expect(screen.getByText(/E-mail Enviado!/i)).toBeInTheDocument();
      expect(screen.getByText(/Verifique sua caixa de entrada/i)).toBeInTheDocument();
    });
  });

  it("deve exibir mensagem de erro se onSubmit lançar erro", async () => {
    const mockSubmit = vi.fn().mockRejectedValue(new Error("E-mail não encontrado"));

    renderComponent(mockSubmit);

    const emailInput = screen.getByPlaceholderText(/Digite seu e-mail/i);
    fireEvent.change(emailInput, { target: { value: "invalido@teste.com" } });

    const submitButton = screen.getByRole("button", { name: /Enviar Link de Recuperação/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith("invalido@teste.com");
      expect(screen.getByText(/E-mail não encontrado/i)).toBeInTheDocument();
    });
  });

  it("deve desabilitar o botão enquanto envia", async () => {
    const mockSubmit: (email: string) => Promise<void> = vi.fn(() => new Promise<void>(resolve => setTimeout(resolve, 100)));

    renderComponent(mockSubmit);

    const emailInput = screen.getByPlaceholderText(/Digite seu e-mail/i);
    fireEvent.change(emailInput, { target: { value: "teste@exemplo.com" } });

    const submitButton = screen.getByRole("button", { name: /Enviar Link de Recuperação/i });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("Enviando...");

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
  });

  it("deve exibir link para voltar ao login", () => {
    renderComponent(vi.fn());
    expect(screen.getByRole("link", { name: /Voltar para o login/i })).toHaveAttribute("href", "/login");
  });
});
