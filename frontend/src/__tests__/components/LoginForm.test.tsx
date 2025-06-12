import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import LoginForm from "../../components/LoginForm";

it("submits the login form and shows the links", async () => {
  const onSubmitMock = vi.fn();
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <LoginForm onSubmit={onSubmitMock} />
    </BrowserRouter>
  );

  const emailInput = screen.getByPlaceholderText(/E-mail/i);
  const passwordInput = screen.getByPlaceholderText(/Senha/i);
  const rememberMeCheckbox = screen.getByLabelText(/Lembrar-me/i);
  const submitButton = screen.getByRole("button", { name: /Entrar/i });

  await user.type(emailInput, "teste@example.com");
  await user.type(passwordInput, "minhasenha123");
  await user.click(rememberMeCheckbox);

  await user.click(submitButton);

  expect(onSubmitMock).toHaveBeenCalledTimes(1);
  expect(onSubmitMock).toHaveBeenCalledWith("teste@example.com", "minhasenha123", true);

  expect(screen.getByRole("link", { name: /Cadastrar-se/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Esqueceu a senha\?/i })).toBeInTheDocument();
});
