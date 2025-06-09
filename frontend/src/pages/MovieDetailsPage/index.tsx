import React from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../../components/CommentForm';
import { 
  PageContainer, 
  MovieInfo, 
  MovieImage, 
  MovieDetails, 
  MovieTitle, 
  MovieRating, 
  MovieDescription,
  CommentsSection,
  SectionTitle
} from './styles';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - seria buscado da API baseado no ID
  const movie = {
    id: id || '1',
    title: 'Spider Man',
    image: '/img/spiderman.png',
    rating: 4.8,
    description: 'Peter Parker é um jovem comum até ser picado por uma aranha radioativa e ganhar superpoderes. Agora ele deve aprender a usar suas habilidades para proteger Nova York como o Homem-Aranha.',
    year: 2002,
    genre: 'Ação, Aventura',
    duration: '121 min'
  };

  const handleComment = (comment: string) => {
    console.log('Novo comentário:', comment);
    // Aqui seria implementada a lógica para salvar o comentário
  };

  return (
    <PageContainer>
      <MovieInfo>
        <MovieImage src={movie.image} alt={movie.title} />
        <MovieDetails>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieRating>⭐ {movie.rating}</MovieRating>
          <p><strong>Ano:</strong> {movie.year}</p>
          <p><strong>Gênero:</strong> {movie.genre}</p>
          <p><strong>Duração:</strong> {movie.duration}</p>
          <MovieDescription>{movie.description}</MovieDescription>
        </MovieDetails>
      </MovieInfo>

      <CommentsSection>
        <SectionTitle>Comentários</SectionTitle>
        <CommentForm onSubmit={handleComment} />
      </CommentsSection>
    </PageContainer>
  );
};

export default MovieDetailsPage;