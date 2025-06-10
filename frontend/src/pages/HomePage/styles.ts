import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 80px 20px 20px 20px; /* Adicionando padding-top para compensar o header fixo */
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  margin-top: 250px; 

  @media (max-width: 768px) {
    padding: 90px 15px 15px 15px; /* Aumentando padding-top para mobile */
  }

  @media (max-width: 480px) {
    padding: 100px 10px 10px 10px; /* Aumentando ainda mais para telas pequenas */
  }
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
