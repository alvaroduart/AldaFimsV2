import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #000;
    --text: #fff;
    --accent: #DAA520;
    --font: Arial, sans-serif;
    --spacing: 20px;
    --border-radius: 8px;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font);
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  body {
    background: #fff;
    color: #000;
    line-height: 1.5;
    min-height: 100vh;
    font-size: 16px;
  }

  #root {
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
  }

  /* Scrollbar customization */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #DAA520;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #B8860B;
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid #DAA520;
    outline-offset: 2px;
  }

  /* Responsive grid for movie cards */
  .movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
    width: 100%;
  }

  @media (max-width: 1024px) {
    .movies-grid {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 18px;
      padding: 18px;
    }
  }

  @media (max-width: 768px) {
    .movies-grid {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 15px;
      padding: 15px;
    }
  }

  @media (max-width: 480px) {
    .movies-grid {
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      padding: 10px;
    }
  }

  /* Utility classes */
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 15px;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 10px;
    }
  }

  .text-center {
    text-align: center;
  }

  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .mt-4 { margin-top: 2rem; }

  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 2rem; }

  .p-1 { padding: 0.5rem; }
  .p-2 { padding: 1rem; }
  .p-3 { padding: 1.5rem; }
  .p-4 { padding: 2rem; }

  /* Responsive typography */
  h1 {
    font-size: 2.5rem;
    line-height: 1.2;
  }

  h2 {
    font-size: 2rem;
    line-height: 1.3;
  }

  h3 {
    font-size: 1.5rem;
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.75rem;
    }

    h3 {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.1rem;
    }

    body {
      font-size: 14px;
    }
  }
`;
