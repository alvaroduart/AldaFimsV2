import styled from 'styled-components';

export const CardContainer = styled.article`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }

  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
`;

export const MovieImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
  display: block;
  margin-top: 20px;
  
`;

export const MovieTitle = styled.h2`
  font-size: 1.2rem;
  font-style: italic;
  margin: 15px;
  color: #333;
  text-align: center;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0 15px 15px;

  svg {
    color: #DAA520;
    font-size: 1rem;
  }
`;

export const MovieRating = styled.p`
  margin: 0;
  font-weight: bold;
  color: #333;
`;

export const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;

  svg {
    color: ${props => props.isFavorite ? '#e74c3c' : '#666'};
    font-size: 1.2rem;
    transition: color 0.3s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
    
    svg {
      color: ${props => props.isFavorite ? '#c0392b' : '#e74c3c'};
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;
