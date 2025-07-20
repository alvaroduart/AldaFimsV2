import React, { useEffect } from 'react';
import MovieCard from '../../components/MovieCard';
import { useAuth } from '../../hooks/useAuth';
import { PageContainer, PageTitle, MoviesGrid, EmptyState, RemoveButton } from './styles';
import { useHistory } from '../../hooks/useHistory';

const HistoryPage: React.FC = () => {
  const { history, removeFromHistory, getUserHistory } = useHistory();
  const { user } = useAuth();

  const handleMovieClick = (movieId: string) => {
    console.log('Clicou no filme do histórico:', movieId);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        await getUserHistory();
      }
    }
    fetchHistory();
  }, [ user]);

  const handleRemoveFromHistory = (movieId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromHistory(movieId);
  };

  // Se o usuário não estiver logado, não deve chegar aqui devido ao PrivateRoute
  if (!user) {
    return (
      <PageContainer>
        <PageTitle>Histórico de Filmes</PageTitle>
        <EmptyState>
          <p>Você precisa estar logado para ver seu histórico.</p>
        </EmptyState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>Histórico de Filmes</PageTitle>
      
      {history.length > 0 ? (
        <MoviesGrid>
          {history.map((history) => (
            <div key={history.movie.id} style={{ position: 'relative' }}>
              <MovieCard
                id={history.movie.id}
                title={history.movie.title}
                image={history.movie.image}
                rating={history.movie.rating}
                onClick={() => handleMovieClick(history.movie.id)}
                showFavoriteButton={false}
              />
              <RemoveButton
                onClick={(e) => handleRemoveFromHistory(history.movie.id, e)}
                title="Remover do histórico"
              >
                ✕
              </RemoveButton>
            </div>
          ))}
        </MoviesGrid>
      ) : (
        <EmptyState>
          <p>Você ainda não assistiu nenhum filme.</p>
          <p>Comece a explorar nosso catálogo!</p>
        </EmptyState>
      )}
    </PageContainer>
  );
};

export default HistoryPage;
