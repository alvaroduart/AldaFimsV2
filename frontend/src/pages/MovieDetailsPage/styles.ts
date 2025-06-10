import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
    margin-top: 20px;
  }
`;

export const MovieInfo = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

export const MovieImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    max-width: 350px;
    margin: 0 auto;
    display: block;
  }
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
    text-align: center;
  }
`;

export const MovieRating = styled.div`
  font-size: 1.5rem;
  color: #DAA520;
  font-weight: bold;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    text-align: center;
  }
`;

export const MovieMeta = styled.div`
  p {
    margin: 5px 0;
    color: #666;
    font-size: 1rem;
    
    @media (max-width: 480px) {
      text-align: center;
    }
  }
`;

export const MovieDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333 !important;
  margin-top: 20px;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    text-align: justify;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    justify-content: center;
    gap: 10px;
  }
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
  
  @media (max-width: 480px) {
    padding: 10px 15px;
    font-size: 14px;
    flex: 1;
    justify-content: center;
  }
`;

export const CommentsSection = styled.section`
  border-top: 1px solid #ddd;
  padding-top: 40px;
  
  @media (max-width: 768px) {
    padding-top: 30px;
  }
`;

export const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;