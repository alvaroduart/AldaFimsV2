import React, { useEffect } from 'react';
import MovieCard from '../../components/MovieCard';
import { PageContainer, MoviesGrid } from './styles';
import { useMovie } from '../../hooks/useMovie';

const HomePage: React.FC = () => {
  const { movies, getAllMovies } = useMovie();

  const handleMovieClick = (movieId: string) => {
    console.log('Clicou no filme:', movieId);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      await getAllMovies();
    };
    fetchMovies();
  }, []);

  return (
    <PageContainer>
      <MoviesGrid>
        {movies.map((movie) => (
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


