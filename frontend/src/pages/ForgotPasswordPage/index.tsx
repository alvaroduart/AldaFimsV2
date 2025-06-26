import React from 'react';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import { mockUsers } from '../../mocks';
import { PageContainer } from './styles';

const ForgotPasswordPage: React.FC = () => {
  const handleForgotPassword = async (email: string) => {
    // Verificar se o e-mail existe nos dados mock
    const userExists = mockUsers.find(user => user.email === email);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (!userExists) {
          // E-mail não encontrado nos dados mock
          reject(new Error('Não existe uma conta cadastrada com esse e-mail.'));
          return;
        }
        
        // Simula sucesso na maioria dos casos para e-mails existentes
        if (Math.random() > 0.1) {
          console.log(`Link de recuperação enviado para: ${email}`);
          resolve();
        } else {
          // Simula erro ocasional para teste
          reject(new Error('Erro no servidor. Tente novamente mais tarde.'));
        }
      }, 2000); // Simula delay da rede
    });
  };

  return (
    <PageContainer>
      <ForgotPasswordForm onSubmit={handleForgotPassword} />
    </PageContainer>
  );
};

export default ForgotPasswordPage;

