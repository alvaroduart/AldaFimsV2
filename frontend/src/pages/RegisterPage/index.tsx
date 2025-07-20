import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import RegisterForm from '../../components/RegisterForm';
import { PageContainer } from './styles';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (username: string, email: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    setIsLoading(true);
    try {
      await register({ username, email, password });
      alert('Cadastro realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
    </PageContainer>
  );
};

export default RegisterPage;
