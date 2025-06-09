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
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    
    onSubmit(name, email, password, confirmPassword);
  };

  return (
    <FormContainer>
      <FormTitle>Cadastrar-se</FormTitle>
      <FormSubtitle>Crie sua conta para acessar todos os recursos</FormSubtitle>
      
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <Input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        
        <SubmitButton type="submit">Cadastrar</SubmitButton>
        
        <LinksContainer>
          Já tem uma conta? <Link to="/login">Iniciar Sessão</Link>
        </LinksContainer>
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;
