import React from 'react';
import MovieCard from '../../components/MovieCard';
import { PageContainer, MoviesGrid } from './styles';
import { mockMovies } from '../../mocks'; // Importar mockMovies do arquivo de mocks

const HomePage: React.FC = () => {
  const handleMovieClick = (movieId: string) => {
    console.log('Clicou no filme:', movieId);
  };

  return (
    <PageContainer>
      <MoviesGrid>
        {mockMovies.map((movie) => (
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
    </PageContainer>
  );
};

export default HomePage;


