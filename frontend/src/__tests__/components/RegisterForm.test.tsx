import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import RegisterForm from "../../components/RegisterForm";

it("deve permitir o cadastro de um novo usuário com dados válidos", async () => {
  const onSubmitMock = vi.fn();
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <RegisterForm onSubmit={onSubmitMock} />
    </BrowserRouter>
  );

  const nameInput = screen.getByPlaceholderText(/Nome Completo/i);
  const emailInput = screen.getByPlaceholderText(/E-mail/i);
  const passwordInput = screen.getByPlaceholderText(/^Senha$/i);
  const confirmPasswordInput = screen.getByPlaceholderText(/Confirmar Senha/i);
  const submitButton = screen.getByRole("button", { name: /Cadastrar/i });

  await user.type(nameInput, "Novo Usuário");
  await user.type(emailInput, "novo.usuario@example.com");
  await user.type(passwordInput, "senhaSegura123");
  await user.type(confirmPasswordInput, "senhaSegura123");

  await user.click(submitButton);

  expect(onSubmitMock).toHaveBeenCalledTimes(1);
  expect(onSubmitMock).toHaveBeenCalledWith(
    "Novo Usuário",
    "novo.usuario@example.com",
    "senhaSegura123",
    "senhaSegura123"
  );
});
