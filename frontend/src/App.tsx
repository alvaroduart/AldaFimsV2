import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import { GlobalStyles } from './styles/GlobalStyle';
import AppRoutes from './routes';
import { HistoryProvider } from './contexts/HistoryContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { setupInterceptors } from './services/http/interceptors';
import { CommentsProvider } from './contexts/CommentsContext';
import { ContactProvider } from './contexts/ContactContext';

const App: React.FC = () => {

  const navigate = useNavigate();
  setupInterceptors(() => {
    navigate("/login");
  });


  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <MovieProvider>
          <HistoryProvider>
            <FavoritesProvider>
              <HistoryProvider>
                <CommentsProvider>
                  <ContactProvider>
                    <AppRoutes />
                  </ContactProvider>
                </CommentsProvider>
              </HistoryProvider>
            </FavoritesProvider>
          </HistoryProvider>
        </MovieProvider>
      </AuthProvider>
    </>
  );
};

export default App;
