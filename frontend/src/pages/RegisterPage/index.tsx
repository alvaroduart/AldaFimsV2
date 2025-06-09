import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm';
import { PageContainer } from './styles';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (name: string, email: string, password: string, confirmPassword: string) => {
    // Aqui seria implementada a lógica de registro
    console.log('Registro:', { name, email, password, confirmPassword });
    
    // Simular registro bem-sucedido
    // Em uma aplicação real, isso seria feito através de uma API
    alert('Cadastro realizado com sucesso!');
    
    // Redirecionar para a página de login após registro
    navigate('/login');
  };

  return (
    <PageContainer>
      <RegisterForm onSubmit={handleRegister} />
    </PageContainer>
  );
};

export default RegisterPage;
