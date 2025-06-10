import React from 'react';
import MovieCard from '../../components/MovieCard';
import { useMovies } from '../../contexts/MovieContext';
import { PageContainer, PageTitle, MoviesGrid, EmptyState, RemoveButton } from './styles';

const FavoritesPage: React.FC = () => {
  const { favoriteMovies, removeFromFavorites } = useMovies();

  const handleMovieClick = (movieId: string) => {
    console.log('Clicou no filme favorito:', movieId);
  };

  const handleRemoveFromFavorites = (movieId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromFavorites(movieId);
  };

  return (
    <PageContainer>
      <PageTitle>Meus Favoritos</PageTitle>
      
      {favoriteMovies.length > 0 ? (
        <MoviesGrid>
          {favoriteMovies.map((movie) => (
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
                onClick={(e) => handleRemoveFromFavorites(movie.id, e)}
                title="Remover dos favoritos"
              >
                ✕
              </RemoveButton>
            </div>
          ))}
        </MoviesGrid>
      ) : (
        <EmptyState>
          <p>Você ainda não tem filmes favoritos.</p>
          <p>Explore nosso catálogo e adicione seus filmes preferidos!</p>
        </EmptyState>
      )}
    </PageContainer>
  );
};

export default FavoritesPage;
