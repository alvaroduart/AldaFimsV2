import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
`;

export const FormTitle = styled.h1`
  color: #333;
  margin-bottom: 10px;
  font-size: 2rem;
`;

export const FormSubtitle = styled.p`
  color: #666;
  margin-bottom: 30px;
  font-size: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

export const LinksContainer = styled.p`
  margin-top: 20px;
  color: #666;

  a {
    color: #DAA520;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
