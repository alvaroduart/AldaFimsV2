import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
`;

export const PageTitle = styled.h1`
  color: #333;
  margin-bottom: 10px;
  font-size: 2.5rem;
`;

export const PageSubtitle = styled.p`
  color: #666;
  margin-bottom: 40px;
  font-size: 1.2rem;
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
`;

export const Input = styled.input`
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #DAA520;
  }

  &::placeholder {
    color: #999;
  }
`;

export const TextArea = styled.textarea`
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #DAA520;
  }

  &::placeholder {
    color: #999;
  }
`;

export const SubmitButton = styled.button`
  background: #DAA520;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #B8860B;
  }

  &:active {
    transform: translateY(1px);
  }
`;
