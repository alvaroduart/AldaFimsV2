import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import { GlobalStyles } from './styles/GlobalStyle';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AuthProvider>
        <MovieProvider>
          <AppRoutes />
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
