import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const PageTitle = styled.h1`
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const MoviesGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 10px;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;

  p {
    font-size: 1.2rem;
    margin-bottom: 10px;

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(255, 0, 0, 1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;
