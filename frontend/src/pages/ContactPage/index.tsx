import React, { useState } from 'react';
import ContactForm from '../../components/ContactForm';
import type { ContactFormData } from '../../types';
import { PageContainer } from './styles';
import { useContact } from '../../hooks/useContact';
import { useNavigate } from 'react-router-dom';

const ContactPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addContact } = useContact();
  const navigate = useNavigate();

  const handleSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    
    try {
      console.log('Enviando dados do contato:', data);
      const contact = await addContact(data.name, data.email, data.message);
      console.log('Contato:', contact);
      if (confirm('Mensagem enviada com sucesso! Entraremos em contato em breve.')){
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Contato:', data);
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');

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
