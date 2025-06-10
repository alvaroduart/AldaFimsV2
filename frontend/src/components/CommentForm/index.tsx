import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
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

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
  userId: string;
}

interface CommentFormProps {
  onSubmit: (comment: string) => void;
  movieId?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, movieId }) => {
  const { user, isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'João Silva',
      text: 'Filme incrível! Uma das melhores adaptações de super-herói que já vi.',
      date: '2024-06-08',
      userId: '1'
    },
    {
      id: '2',
      author: 'Maria Santos',
      text: 'Gostei muito da atuação do protagonista. História envolvente!',
      date: '2024-06-07',
      userId: '2'
    }
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Você precisa estar logado para comentar!');
      return;
    }
    
    if (comment.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: user?.name || 'Usuário',
        text: comment.trim(),
        date: new Date().toISOString().split('T')[0],
        userId: user?.id || ''
      };
      
      setComments([newComment, ...comments]);
      setComment('');
      onSubmit(comment.trim());
    }
  };

  const handleEdit = (commentId: string, currentText: string) => {
    setEditingId(commentId);
    setEditText(currentText);
  };

  const handleSaveEdit = (commentId: string) => {
    if (editText.trim()) {
      setComments(comments.map(c => 
        c.id === commentId 
          ? { ...c, text: editText.trim() }
          : c
      ));
      setEditingId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleDelete = (commentId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este comentário?')) {
      setComments(comments.filter(c => c.id !== commentId));
    }
  };

  const canEditComment = (commentUserId: string) => {
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
        {comments.map((commentItem) => (
          <CommentItem key={commentItem.id}>
            <CommentAuthor>{commentItem.author}</CommentAuthor>
            <CommentDate>{new Date(commentItem.date).toLocaleDateString('pt-BR')}</CommentDate>
            
            {editingId === commentItem.id ? (
              <div>
                <EditTextArea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={3}
                />
                <CommentActions>
                  <ActionButton 
                    onClick={() => handleSaveEdit(commentItem.id)}
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
                <CommentText>{commentItem.text}</CommentText>
                {canEditComment(commentItem.userId) && (
                  <CommentActions>
                    <ActionButton 
                      onClick={() => handleEdit(commentItem.id, commentItem.text)}
                      color="#3498db"
                      title="Editar"
                    >
                      <FaEdit />
                    </ActionButton>
                    <ActionButton 
                      onClick={() => handleDelete(commentItem.id)}
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
        ))}
      </CommentsList>
    </div>
  );
};

export default CommentForm;
