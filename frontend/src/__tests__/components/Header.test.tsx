import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import Header from '../../components/Header';
import { MemoryRouter } from 'react-router-dom';

const mockedNavigate = vi.fn();
const mockedLogout = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Variável para controlar se está autenticado
let isAuthenticated = true;
let user: { name: string } | null = { name: 'João' };

// Mock fixo do AuthContext
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user,
    isAuthenticated,
    logout: mockedLogout,
  }),
}));

describe('<Header />', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    mockedLogout.mockClear();

    // Reset valores padrão para cada teste
    isAuthenticated = true;
    user = { name: 'João' };
  });

  it('renderiza logo e elementos principais', () => {
    render(<Header />, { wrapper: MemoryRouter });

    expect(screen.getByAltText(/logo alda films/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/pesquisar/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /alternar tema/i })).toBeInTheDocument();
  });

  it('abre o menu hamburguer ao clicar', async () => {
    render(<Header />, { wrapper: MemoryRouter });

    const btn = screen.getByLabelText(/abrir menu/i);
    await userEvent.click(btn);

    expect(screen.getByText(/favoritos/i)).toBeInTheDocument();
    expect(screen.getByText(/histórico/i)).toBeInTheDocument();
    expect(screen.getByText(/contato/i)).toBeInTheDocument();
  });

  it('executa busca no submit do formulário', async () => {
    console.log = vi.fn();

    render(<Header />, { wrapper: MemoryRouter });

    const input = screen.getByPlaceholderText(/pesquisar/i);
    const btn = screen.getByRole('button', { name: /pesquisar/i });

    await userEvent.type(input, 'Inception');
    await userEvent.click(btn);

    expect(console.log).toHaveBeenCalledWith('Buscar por:', 'Inception');
  });

  it('alterna menu do usuário e faz logout', async () => {
    render(<Header />, { wrapper: MemoryRouter });

    await userEvent.click(screen.getByLabelText(/menu do usuário/i));
    expect(screen.getByText(/olá, joão/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /sair/i }));
    expect(mockedLogout).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });

  it('chama onToggleDarkMode ao clicar no botão de tema', async () => {
    const toggleMock = vi.fn();
    render(<Header isDarkMode={false} onToggleDarkMode={toggleMock} />, {
      wrapper: MemoryRouter,
    });

    await userEvent.click(screen.getByRole('button', { name: /alternar tema/i }));
    expect(toggleMock).toHaveBeenCalled();
  });

  it('mostra link de login quando não autenticado', () => {
    // Altera mock para usuário não autenticado
    isAuthenticated = false;
    user = null;

    render(<Header />, { wrapper: MemoryRouter });

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/menu do usuário/i)).not.toBeInTheDocument();
  });
});
