import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FormContainer, 
  FormTitle, 
  FormSubtitle, 
  Form, 
  Input, 
  CheckboxContainer, 
  Checkbox, 
  Label, 
  SubmitButton, 
  LinksContainer 
} from './styles';

interface LoginFormProps {
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, rememberMe);
  };

  return (
    <FormContainer>
      <FormTitle>Iniciar Sessão</FormTitle>
      <FormSubtitle>Acesse sua conta para continuar</FormSubtitle>
      
      <Form onSubmit={handleSubmit}>
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
        
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Label htmlFor="remember">Lembrar-me</Label>
        </CheckboxContainer>
        
        <SubmitButton type="submit">Entrar</SubmitButton>
        
        <LinksContainer>
          <Link to="/cadastro">Cadastrar-se</Link>
          <span> | </span>
          <Link to="/esqueci-senha">Esqueceu a senha?</Link>
        </LinksContainer>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;
