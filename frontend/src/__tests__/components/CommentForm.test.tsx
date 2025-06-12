import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CommentForm from '../../components/CommentForm';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import { useAuth } from '../../contexts/AuthContext';
import { mockAPI } from '../../mocks';
import type { Comment } from '../../types';

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn()
}));

vi.mock('../../mocks', () => ({
  mockAPI: {
    getCommentsByMovieId: vi.fn()
  }
}));

const mockOnSubmit = vi.fn();

const fakeUser = {
  id: 'user-1',
  name: 'Maria'
};

const mockComments: Comment[] = [
  {
    id: 'c1',
    movieId: 'm1',
    userId: 'user-1',
    userName: 'Maria',
    content: 'Comentário original',
    createdAt: new Date('2024-01-01')
  }
];

describe('<CommentForm />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('mostra aviso se o usuário não estiver autenticado', () => {
    (useAuth as Mock).mockReturnValue({ isAuthenticated: false, user: null });

    render(<CommentForm onSubmit={mockOnSubmit} movieId="m1" />);
    expect(screen.getByText(/Você precisa estar logado/i)).toBeInTheDocument();
  });

  it('carrega e exibe comentários quando autenticado', async () => {
    (useAuth as Mock).mockReturnValue({ isAuthenticated: true, user: fakeUser });
    (mockAPI.getCommentsByMovieId as Mock).mockResolvedValue(mockComments);

    render(<CommentForm onSubmit={mockOnSubmit} movieId="m1" />);

    expect(screen.getByText(/Carregando comentários/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Comentário original/i)).toBeInTheDocument();
    });
  });

  it('permite editar comentário próprio', async () => {
    (useAuth as Mock).mockReturnValue({ isAuthenticated: true, user: fakeUser });
    (mockAPI.getCommentsByMovieId as Mock).mockResolvedValue(mockComments);

    render(<CommentForm onSubmit={mockOnSubmit} movieId="m1" />);

    await screen.findByText(/Comentário original/i);
    fireEvent.click(screen.getByTitle('Editar'));

    const textarea = screen.getByDisplayValue('Comentário original');
    fireEvent.change(textarea, { target: { value: 'Comentário editado' } });

    fireEvent.click(screen.getByTitle('Salvar'));

    await waitFor(() => {
      expect(screen.getByText(/Comentário editado/i)).toBeInTheDocument();
    });
  });

  it('permite excluir comentário com confirmação', async () => {
    global.confirm = vi.fn(() => true);

    (useAuth as Mock).mockReturnValue({ isAuthenticated: true, user: fakeUser });
    (mockAPI.getCommentsByMovieId as Mock).mockResolvedValue(mockComments);

    render(<CommentForm onSubmit={mockOnSubmit} movieId="m1" />);

    await screen.findByText(/Comentário original/i);
    fireEvent.click(screen.getByTitle('Excluir'));

    await waitFor(() => {
      expect(screen.queryByText(/Comentário original/i)).not.toBeInTheDocument();
    });
  });

  it('não envia comentário vazio', () => {
    (useAuth as Mock).mockReturnValue({ isAuthenticated: true, user: fakeUser });
    (mockAPI.getCommentsByMovieId as Mock).mockResolvedValue([]);

    render(<CommentForm onSubmit={mockOnSubmit} movieId="m1" />);
    fireEvent.click(screen.getByText(/Enviar Comentário/i));

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
