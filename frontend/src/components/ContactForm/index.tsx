import React, { useState } from 'react';
import type { ContactFormData } from '../../types';
import {
  FormContainer,
  FormTitle,
  FormSubtitle,
  Form,
  InputGroup,
  Input,
  TextArea,
  SubmitButton,
  ErrorMessage
} from './styles';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  showTitle?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  title = "Contate-nos",
  subtitle = "Nossos atendentes estão preparados para te ajudar!",
  isLoading = false,
  showTitle = true
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim()
    });
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };
 
  return (
    <FormContainer>
      {showTitle && (
        <>
          <FormTitle>{title}</FormTitle>
          <FormSubtitle>{subtitle}</FormSubtitle>
        </>
      )}
      
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Seu Nome"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={isLoading}
            required
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </InputGroup>
        
        <InputGroup>
          <Input
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={isLoading}
            required
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </InputGroup>
        
        <InputGroup>
          <TextArea
            placeholder="Comentário / Dúvida"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={6}
            disabled={isLoading}
            required
          />
          {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
        </InputGroup>
        
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default ContactForm;

