import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from '../../components/LoginForm';
import { PageContainer } from './styles';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    try {
      await login(email, password, rememberMe);
      
      // Redirecionar para a página anterior ou para a home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro no login. Verifique suas credenciais.');
    }
  };

  return (
    <PageContainer>
      <LoginForm onSubmit={handleLogin} />
    </PageContainer>
  );
};

export default LoginPage;