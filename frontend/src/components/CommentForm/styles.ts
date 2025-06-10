import styled from 'styled-components';

export const FormContainer = styled.form`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    margin-bottom: 15px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  margin-bottom: 15px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #DAA520;
  }

  &::placeholder {
    color: #6c757d;
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 14px;
    min-height: 80px;
  }
`;

export const EditTextArea = styled(TextArea)`
  margin-bottom: 10px;
  min-height: 80px;
`;

export const SubmitButton = styled.button`
  background: #DAA520;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background: #B8860B;
  }

  &:active {
    transform: translateY(1px);
  }

  @media (min-width: 768px) {
    width: auto;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const CommentItem = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #DAA520;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const CommentAuthor = styled.h4`
  color: #333;
  margin: 0 0 5px 0;
  font-size: 16px;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const CommentDate = styled.span`
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 10px;
  display: block;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const CommentText = styled.p`
  color: #495057;
  line-height: 1.6;
  margin: 10px 0 15px 0;
  font-size: 15px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const CommentActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const ActionButton = styled.button<{ color: string }>`
  background: ${props => props.color};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;

    svg {
      font-size: 10px;
    }
  }
`;

export const LoginPrompt = styled.div`
  background: #f8f9fa;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  border: 2px solid #e9ecef;
  margin: 20px 0;

  p {
    color: #6c757d;
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 1.5;

    &:last-child {
      margin-bottom: 0;
      font-weight: 600;
      color: #DAA520;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;

    p {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    padding: 15px;

    p {
      font-size: 13px;
    }
  }
`;

