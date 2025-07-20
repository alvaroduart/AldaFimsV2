import React, { useEffect } from 'react';
import MovieCard from '../../components/MovieCard';
import { PageContainer, PageTitle, MoviesGrid, EmptyState, RemoveButton } from './styles';
import { useFavorite } from '../../hooks/useFavorite';

const FavoritesPage: React.FC = () => {
  const { favorites, removeFromFavorites, getUserFavorites } = useFavorite();

  useEffect(() => {
    const fetchFavorites = async () => {
      await getUserFavorites();
    };
    fetchFavorites();
  }, []);

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
      
      {favorites.length > 0 ? (
        <MoviesGrid>
          {favorites.map((favorite) => (
            <div key={favorite.movie.id} style={{ position: 'relative' }}>
              <MovieCard
                id={favorite.movie.id}
                title={favorite.movie.title}
                image={favorite.movie.image}
                rating={favorite.movie.rating}
                onClick={() => handleMovieClick(favorite.movie.id)}
                showFavoriteButton={false}
              />
              <RemoveButton
                onClick={(e) => handleRemoveFromFavorites(favorite.movie.id, e)}
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
