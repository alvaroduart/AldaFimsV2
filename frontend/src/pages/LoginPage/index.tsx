import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { PageContainer } from './styles';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string, rememberMe: boolean) => {
    // Aqui seria implementada a lógica de autenticação
    console.log('Login:', { email, password, rememberMe });
    
    // Simular login bem-sucedido
    // Em uma aplicação real, isso seria feito através de uma API
    localStorage.setItem('isAuthenticated', 'true');
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    }
    
    // Redirecionar para a página de histórico após login
    navigate('/historico');
  };

  return (
    <PageContainer>
      <LoginForm onSubmit={handleLogin} />
    </PageContainer>
  );
};

export default LoginPage;