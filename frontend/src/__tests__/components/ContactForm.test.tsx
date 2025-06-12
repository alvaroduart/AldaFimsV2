import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "../../components/ContactForm";
import { vi } from "vitest";

it("deve permitir que um usuário envie o formulário com dados válidos", async () => {
  const onSubmitMock = vi.fn();
  const user = userEvent.setup();

  render(<ContactForm onSubmit={onSubmitMock} />);

  const nameInput = screen.getByPlaceholderText(/Seu Nome/i);
  const emailInput = screen.getByPlaceholderText(/E-mail/i);
  const messageInput = screen.getByPlaceholderText(/Comentário \/ Dúvida/i);
  const submitButton = screen.getByRole("button", { name: /Enviar/i });

  await user.type(nameInput, "Usuário Teste");
  await user.type(emailInput, "usuario.teste@example.com");
  await user.type(messageInput, "Olá! Esta é uma mensagem de teste com mais de dez caracteres.");

  await user.click(submitButton);

  expect(onSubmitMock).toHaveBeenCalledTimes(1);
  expect(onSubmitMock).toHaveBeenCalledWith({
    name: "Usuário Teste",
    email: "usuario.teste@example.com",
    message: "Olá! Esta é uma mensagem de teste com mais de dez caracteres.",
  });
});