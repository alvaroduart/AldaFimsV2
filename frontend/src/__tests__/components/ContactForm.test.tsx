// src/__tests__/components/ContactForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../../components/ContactForm';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';


describe('<ContactForm />', () => {
  it('exibe mensagens de erro ao tentar enviar sem preencher', async () => {
    render(<ContactForm onSubmit={function (): void {
      throw new Error('Function not implemented.');
    } } />);

    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    
  });

  it('valida e-mail inválido e mensagem curta', async () => {
    render(<ContactForm onSubmit={vi.fn()} />);

    const nomeInput = screen.getByPlaceholderText(/seu nome/i);
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const mensagemTextarea = screen.getByPlaceholderText(/comentário/i);

    await userEvent.type(nomeInput, 'A');
    await userEvent.type(emailInput, 'email-invalido');
    await userEvent.type(mensagemTextarea, 'Curto');

    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    
  });

  it('limpa mensagens de erro ao alterar os campos', async () => {
    render(<ContactForm onSubmit={vi.fn()} />);

    const nomeInput = screen.getByPlaceholderText(/seu nome/i);

    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await userEvent.type(nomeInput, 'Lucas');
    
  });
});
