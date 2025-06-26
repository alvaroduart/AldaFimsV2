import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FormContainer, 
  FormTitle, 
  FormSubtitle, 
  Form, 
  Input, 
  SubmitButton, 
  BackLink,
  SuccessMessage,
  ErrorMessage
} from './styles';

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await onSubmit(email);
      setIsSuccess(true);
    } catch (err) {
      // Exibe a mensagem de erro específica retornada pela função
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar e-mail de recuperação. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <FormContainer>
        <FormTitle>E-mail Enviado!</FormTitle>
        <SuccessMessage>
          <p>Enviamos um link de recuperação para <strong>{email}</strong>.</p>
          <p>Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.</p>
          <p>Não esqueça de verificar a pasta de spam!</p>
        </SuccessMessage>
        <BackLink>
          <Link to="/login">Voltar para o login</Link>
        </BackLink>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <FormTitle>Esqueceu a Senha?</FormTitle>
      <FormSubtitle>
        Digite seu e-mail abaixo e enviaremos um link para redefinir sua senha.
      </FormSubtitle>
      
      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}
      
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
        </SubmitButton>
        
        <BackLink>
          <Link to="/login">Voltar para o login</Link>
        </BackLink>
      </Form>
    </FormContainer>
  );
};

export default ForgotPasswordForm;

