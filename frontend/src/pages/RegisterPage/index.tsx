import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import RegisterForm from '../../components/RegisterForm';
import { PageContainer } from './styles';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (name: string, email: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    setIsLoading(true);
    try {
      await register(name, email, password);
      alert('Cadastro realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
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
