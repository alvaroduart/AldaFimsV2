import React from 'react';
import MovieCard from '../../components/MovieCard';
import { PageContainer, PageTitle, MoviesGrid, EmptyState } from './styles';

const HistoryPage: React.FC = () => {
  // Mock data - seria buscado da API
  const watchedMovies = [
    {
      id: '1',
      title: 'Spider Man',
      image: '/img/spiderman.png',
      rating: 4.8
    },
    {
      id: '3',
      title: 'Justice League',
      image: '/img/Justice Ligue.png',
      rating: 2.3
    },
    {
      id: '4',
      title: 'A Forja',
      image: '/img/forja.png',
      rating: 1.2
    }
  ];

  const handleMovieClick = (movieId: string) => {
    console.log('Clicou no filme do histórico:', movieId);
  };

  return (
    <PageContainer>
      <PageTitle>Histórico de Filmes</PageTitle>
      
      {watchedMovies.length > 0 ? (
        <MoviesGrid>
          {watchedMovies.map((movie) => (
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
          <p>Você ainda não assistiu nenhum filme.</p>
          <p>Comece a explorar nosso catálogo!</p>
        </EmptyState>
      )}
    </PageContainer>
  );
};

export default HistoryPage;
