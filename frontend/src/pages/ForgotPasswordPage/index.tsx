import React from 'react';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import { mockUsers } from '../../mocks';
import { PageContainer } from './styles';

const ForgotPasswordPage: React.FC = () => {
  const handleForgotPassword = async (email: string) => {
    
    const userExists = mockUsers.find(user => user.email === email);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (!userExists) {
          
          reject(new Error('Não existe uma conta cadastrada com esse e-mail.'));
          return;
        }
        
        
        if (Math.random() > 0.1) {
          console.log(`Link de recuperação enviado para: ${email}`);
          resolve();
        } else {
          
          reject(new Error('Erro no servidor. Tente novamente mais tarde.'));
        }
      }, 2000); 
    });
  };

  return (
    <PageContainer>
      <ForgotPasswordForm onSubmit={handleForgotPassword} />
    </PageContainer>
  );
};

export default ForgotPasswordPage;

