import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 20px 0;
`;

export const PageTitle = styled.h1`
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-align: center;
`;

export const MoviesGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;

  p {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
`;
