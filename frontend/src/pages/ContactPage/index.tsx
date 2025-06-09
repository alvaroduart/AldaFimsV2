import React, { useState } from 'react';
import { 
  PageContainer, 
  PageTitle, 
  PageSubtitle, 
  ContactForm, 
  Input, 
  TextArea, 
  SubmitButton 
} from './styles';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui seria implementada a lógica para enviar o formulário
    console.log('Contato:', { name, email, message });
    
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Limpar formulário
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <PageContainer>
      <PageTitle>Contate-nos</PageTitle>
      <PageSubtitle>Nossos atendentes estão preparados para te ajudar!</PageSubtitle>
      
      <ContactForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Seu Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <TextArea
          placeholder="Comentário / Dúvida"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          required
        />
        
        <SubmitButton type="submit">Enviar</SubmitButton>
      </ContactForm>
    </PageContainer>
  );
};

export default ContactPage;
