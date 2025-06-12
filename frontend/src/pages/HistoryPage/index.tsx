import React from 'react';
import MovieCard from '../../components/MovieCard';
import { useMovies } from '../../contexts/MovieContext';
import { useAuth } from '../../contexts/AuthContext';
import { PageContainer, PageTitle, MoviesGrid, EmptyState, RemoveButton } from './styles';

const HistoryPage: React.FC = () => {
  const { watchedMovies, removeFromWatched } = useMovies();
  const { user } = useAuth();

  const handleMovieClick = (movieId: string) => {
    console.log('Clicou no filme do histórico:', movieId);
    
  };

  const handleRemoveFromHistory = (movieId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromWatched(movieId);
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
      
      {watchedMovies.length > 0 ? (
        <MoviesGrid>
          {watchedMovies.map((movie) => (
            <div key={movie.id} style={{ position: 'relative' }}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                image={movie.image}
                rating={movie.rating}
                onClick={() => handleMovieClick(movie.id)}
                showFavoriteButton={false}
              />
              <RemoveButton
                onClick={(e) => handleRemoveFromHistory(movie.id, e)}
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
