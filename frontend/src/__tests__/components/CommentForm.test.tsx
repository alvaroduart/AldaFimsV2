import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import CommentForm from "../../components/CommentForm"; 

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    isAuthenticated: true,
    user: {
      id: "user-1",
      name: "Usuário Teste",
    },
  }),
}));

vi.mock("../../mocks", () => ({
  mockAPI: {
    getCommentsByMovieId: vi.fn().mockResolvedValue([]), // Retorna um array vazio de comentários
  },
}));

describe("CommentForm (Simples)", () => {
  it("deve permitir que um usuário autenticado escreva e envie um comentário", async () => {
    
    const onSubmitMock = vi.fn();
    const user = userEvent.setup(); 
    render(<CommentForm movieId="movie-1" onSubmit={onSubmitMock} />);    
    const commentInput = screen.getByPlaceholderText(
      /Deixe seu comentário sobre o filme.../i
    );
    const submitButton = screen.getByRole("button", {
      name: /Enviar Comentário/i,
    });

    
    await user.type(commentInput, "Este é um comentário de teste.");    
    await user.click(submitButton);    
    expect(onSubmitMock).toHaveBeenCalledWith("Este é um comentário de teste.");
    expect(commentInput).toHaveValue("");
  });
});