import React from 'react';
import MovieCard from '../../components/MovieCard';
import { PageContainer, MoviesGrid } from './styles';

// Mock data - será substituído por dados reais posteriormente
const mockMovies = [
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
  },
  {
    id: '5',
    title: 'Spider Man',
    image: '/img/spiderman.png',
    rating: 4.8
  },
  {
    id: '6',
    title: 'Batman',
    image: '/img/Batman.png',
    rating: 3.7
  },
  {
    id: '7',
    title: 'Justice League',
    image: '/img/Justice Ligue.png',
    rating: 2.3
  },
  {
    id: '8',
    title: 'A Forja',
    image: '/img/forja.png',
    rating: 1.2
  }
];

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
