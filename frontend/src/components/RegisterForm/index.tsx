import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FormContainer, 
  FormTitle, 
  FormSubtitle, 
  Form, 
  Input, 
  SubmitButton, 
  LinksContainer 
} from './styles';

interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string, confirmPassword: string) => void;
  isLoading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading = false }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit(name.trim(), email.trim(), password, confirmPassword);
  };

  return (
    <FormContainer>
      <FormTitle>Cadastrar-se</FormTitle>
      <FormSubtitle>Crie sua conta para acessar todos os recursos</FormSubtitle>
      
      <Form onSubmit={handleSubmit}>
        <div>
          <Input
            type="text"
            placeholder="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
          {errors.name && <span style={{color: 'red', fontSize: '14px'}}>{errors.name}</span>}
        </div>
        
        <div>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          {errors.email && <span style={{color: 'red', fontSize: '14px'}}>{errors.email}</span>}
        </div>
        
        <div>
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          {errors.password && <span style={{color: 'red', fontSize: '14px'}}>{errors.password}</span>}
        </div>
        
        <div>
          <Input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          {errors.confirmPassword && <span style={{color: 'red', fontSize: '14px'}}>{errors.confirmPassword}</span>}
        </div>
        
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </SubmitButton>
        
        <LinksContainer>
          Já tem uma conta? <Link to="/login">Iniciar Sessão</Link>
        </LinksContainer>
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;
