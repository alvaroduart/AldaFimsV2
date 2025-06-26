import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 200px); /* Garante altura mínima considerando header e footer */
`;

export const MovieInfo = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const MovieImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const MovieTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const MovieRating = styled.div`
  font-size: 1.5rem;
  color: #DAA520;
  font-weight: bold;
`;

export const MovieMeta = styled.div`
  p {
    margin: 5px 0;
    color: #666;
    font-size: 1rem;
  }
`;

export const MovieDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333 !important;
  margin-top: 20px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button<{ primary?: boolean; isFavorite?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary ? `
    background: #DAA520;
    color: white;
    
    &:hover {
      background: #B8860B;
    }
  ` : `
    background: ${props.isFavorite ? '#e74c3c' : '#f8f9fa'};
    color: ${props.isFavorite ? 'white' : '#333'};
    border: 2px solid ${props.isFavorite ? '#e74c3c' : '#ddd'};
    
    &:hover {
      background: ${props.isFavorite ? '#c0392b' : '#e9ecef'};
      border-color: ${props.isFavorite ? '#c0392b' : '#adb5bd'};
    }
  `}

  &:active {
    transform: translateY(1px);
  }

  svg {
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 16px;
  }
`;

export const CommentsSection = styled.section`
  border-top: 1px solid #ddd;
  padding-top: 40px;
  margin-top: 40px;
`;

export const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8rem;
`;



export const UserRatingContainer = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  text-align: center;

  .stars {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-top: 10px;
  }
`;

export const RatingText = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #666;
  font-weight: 500;
`;

export const StarButton = styled.button<{ filled: boolean; disabled?: boolean }>`
  background: none;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  padding: 5px;
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.5 : 1};

  svg {
    color: ${props => props.filled ? '#DAA520' : '#ddd'};
    font-size: 1.8rem;
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: ${props => props.disabled ? (props.filled ? '#DAA520' : '#ddd') : '#DAA520'};
    transform: ${props => props.disabled ? 'none' : 'scale(1.1)'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'scale(0.95)'};
  }
`;

export const LoginPrompt = styled.div`
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;

  a {
    color: #DAA520;
    text-decoration: none;
    font-weight: 600;
    margin-top: 10px;
    display: inline-block;

    &:hover {
      text-decoration: underline;
    }
  }
`;

