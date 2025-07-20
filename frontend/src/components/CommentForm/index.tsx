import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import type { Comment } from '../../types';
import { 
  FormContainer, 
  TextArea, 
  SubmitButton, 
  CommentsList, 
  CommentItem, 
  CommentAuthor, 
  CommentText, 
  CommentDate, 
  CommentActions, 
  ActionButton,
  EditTextArea,
  LoginPrompt 
} from './styles';
import { useComments } from '../../hooks/useComments';

interface CommentFormProps {
  //onSubmit: (comment: string) => void;
  movieId?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ movieId }) => {
  const { user, isAuthenticated } = useAuth();
  const { getCommentsByMovieId, addComment, updateComment, deleteComment} = useComments()
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadComments = async () => {
      if (movieId) {
        setLoading(true);
        try {
          const fetchComments = async () => {
            
            const movieComments = await getCommentsByMovieId(movieId);
            setComments(movieComments);
            
          }
          fetchComments();
        } catch (error) {
          console.error('Erro ao carregar comentários:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadComments();
  }, [movieId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Você precisa estar logado para comentar!');
      return;
    }
    
    if (comment.trim() && movieId) {
      await addComment(movieId, comment.trim());
      const movieComments = await getCommentsByMovieId(movieId);
      setComments(movieComments);
    }
  };

  const handleEdit = (commentId: string, currentText: string) => {
    setEditingId(commentId);
    setEditText(currentText);
  };

  const handleSaveEdit = async (commentId: string) => {
    if (editText.trim()) {
      setComments(comments.map(c => 
        c.id === commentId 
          ? { ...c, content: editText.trim() }
          : c
      ));

      const update = await updateComment(commentId, movieId!, editText.trim());
      if (update) {
        const movieComments = await getCommentsByMovieId(movieId!);
        setComments(movieComments);
      } else {
        alert('Erro ao atualizar comentário');
      }
      
      setEditingId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleDelete = async (commentId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este comentário?')) {
      await deleteComment(commentId);
      const movieComments = await getCommentsByMovieId(movieId!);
      setComments(movieComments);
    }
  };

  const canEditComment = (commentUserId: string) => {
    console.log('Verificando se o usuário pode editar o comentário:', user?.id, commentUserId);
    return isAuthenticated && user?.id === commentUserId;
  };

  if (!isAuthenticated) {
    return (
      <div>
        <LoginPrompt>
          <p>Você precisa estar logado para comentar e ver os comentários.</p>
          <p>Faça login para participar da discussão!</p>
        </LoginPrompt>
      </div>
    );
  }

  return (
    <div>
      <FormContainer onSubmit={handleSubmit}>
        <TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Deixe seu comentário sobre o filme..."
          rows={4}
          required
        />
        <SubmitButton type="submit">
          Enviar Comentário
        </SubmitButton>
      </FormContainer>

      <CommentsList>
        {loading ? (
          <p>Carregando comentários...</p>
        ) : (
          comments.map((commentItem) => (
            <CommentItem key={commentItem.id}>
              <CommentAuthor>{commentItem.userName}</CommentAuthor>
              <CommentDate>{commentItem.createdAt.toString()}</CommentDate>
              
              {editingId === commentItem.id ? (
                <div>
                  <EditTextArea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={3}
                  />
                  <CommentActions>
                    <ActionButton 
                      onClick={() => handleSaveEdit(commentItem.id!)}
                      color="#27ae60"
                      title="Salvar"
                    >
                      <FaSave />
                    </ActionButton>
                    <ActionButton 
                      onClick={handleCancelEdit}
                      color="#95a5a6"
                      title="Cancelar"
                    >
                      <FaTimes />
                    </ActionButton>
                  </CommentActions>
                </div>
              ) : (
                <div>
                  <CommentText>{commentItem.content}</CommentText>
                  {canEditComment(commentItem.user.id!) && (
                    <CommentActions>
                      <ActionButton 
                        onClick={() => handleEdit(commentItem.id!, commentItem.content)}
                        color="#3498db"
                        title="Editar"
                      >
                        <FaEdit />
                      </ActionButton>
                      <ActionButton 
                        onClick={() => handleDelete(commentItem.id!)}
                        color="#e74c3c"
                        title="Excluir"
                      >
                        <FaTrash />
                      </ActionButton>
                    </CommentActions>
                  )}
                </div>
              )}
            </CommentItem>
          ))
        )}
      </CommentsList>
    </div>
  );
};

export default CommentForm;
