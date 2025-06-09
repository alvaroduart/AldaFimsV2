import React from 'react';
import MovieCard from '../../components/MovieCard';
import { PageContainer, PageTitle, MoviesGrid, EmptyState } from './styles';

const FavoritesPage: React.FC = () => {
  // Mock data - seria buscado da API
  const favoriteMovies = [
    {
      id: '1',
      title: 'Spider Man',
      image: '/img/spiderman.png',
      rating: 4.8
    },
    {
      id: '2',
      title: 'Batman',
      image: '/img/Batman.png',
      rating: 3.7
    }
  ];

  const handleMovieClick = (movieId: string) => {
    console.log('Clicou no filme favorito:', movieId);
  };

  return (
    <PageContainer>
      <PageTitle>Meus Favoritos</PageTitle>
      
      {favoriteMovies.length > 0 ? (
        <MoviesGrid>
          {favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              image={movie.image}
              rating={movie.rating}
              onClick={() => handleMovieClick(movie.id)}
            />
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
