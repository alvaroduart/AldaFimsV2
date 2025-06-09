import styled from 'styled-components';

export const CardContainer = styled.article`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

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
  object-fit: cover;
  display: block;
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
