import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
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

  p {
    margin: 0;
    color: #666;
  }
`;

export const MovieTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0;
  font-style: italic;
`;

export const MovieRating = styled.div`
  font-size: 1.5rem;
  color: #DAA520;
  font-weight: bold;
`;

export const MovieDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333 !important;
  margin-top: 20px;
`;

export const CommentsSection = styled.section`
  border-top: 1px solid #ddd;
  padding-top: 40px;
`;

export const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8rem;
`;
