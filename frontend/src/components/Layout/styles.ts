import styled from 'styled-components';

export const LayoutContainer = styled.div<{ isDarkMode: boolean }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: ${props => props.isDarkMode ? '#fff' : '#000'};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

export const MainContent = styled.main<{ isDarkMode: boolean }>`
  background-color: ${props => props.isDarkMode ? '#fff' : '#000'};
  flex: 1;
  width: 100%;
  padding: 60px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
    padding-top: 110px; /* Ajusta para telas menores */
  }

  @media (max-width: 480px) {
    padding: 10px;
    padding-top: 100px; /* Ajusta para telas muito pequenas */
  }
`;

