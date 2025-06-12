import React, { useState } from 'react';
import ContactForm from '../../components/ContactForm';
import type { ContactFormData } from '../../types';
import { PageContainer } from './styles';

const ContactPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Contato:', data);
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <ContactForm 
        onSubmit={handleSubmit}
        isLoading={isLoading}
        title="Contate-nos"
        subtitle="Nossos atendentes estão preparados para te ajudar!"
      />
    </PageContainer>
  );
};

export default ContactPage;
