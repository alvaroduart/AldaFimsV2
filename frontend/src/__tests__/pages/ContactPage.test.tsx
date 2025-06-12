import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import React from 'react';


const mockConsoleLog = vi.fn();
const mockConsoleError = vi.fn();
console.log = mockConsoleLog;
console.error = mockConsoleError;

const mockAlert = vi.fn();
window.alert = mockAlert;

vi.mock('../../components/ContactForm', () => {
  interface MockContactFormProps {
    title?: string;
    subtitle?: string;
    isLoading?: boolean;
    onSubmit: (data: { name: string; email: string; message: string }) => void;
  }
  const MockContactForm = vi.fn((props: MockContactFormProps) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      props.onSubmit({ name, email, message });
    };

    return (
      <form data-testid="contact-form" onSubmit={handleSubmit}>
        {props.title && <h1 data-testid="form-title">{props.title}</h1>}
        {props.subtitle && <p data-testid="form-subtitle">{props.subtitle}</p>}
        <input
          type="text"
          placeholder="Seu Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={props.isLoading}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={props.isLoading}
        />
        <textarea
          placeholder="Comentário / Dúvida"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          disabled={props.isLoading}
        />
        <button type="submit" disabled={props.isLoading}>
          {props.isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    );
  });
  return {
    default: MockContactForm,
  };
});

import ContactPage from '../../pages/ContactPage';

const MockApp = ({ initialEntries = ['/contact'] }: { initialEntries?: string[]; }) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/success" element={<div>Mensagem Enviada!</div>} />
      </Routes>
    </MemoryRouter>
  );
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

test("deve exibir os títulos e subtítulos padrão do formulário", async () => {
  render(<MockApp />);
  expect(screen.getByText('Contate-nos')).toBeInTheDocument();
  expect(screen.getByText('Nossos atendentes estão preparados para te ajudar!')).toBeInTheDocument();
});
