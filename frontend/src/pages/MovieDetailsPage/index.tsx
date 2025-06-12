import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovies } from '../../contexts/MovieContext';
import CommentForm from '../../components/CommentForm';
import { FaHeart, FaRegHeart, FaPlay } from 'react-icons/fa';
import { 
  PageContainer, 
  MovieInfo, 
  MovieImage, 
  MovieDetails, 
  MovieTitle, 
  MovieRating, 
  MovieDescription,
  CommentsSection,
  SectionTitle,
  ActionButtons,
  ActionButton,
  MovieMeta
} from './styles';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovieById, favoriteMovies, addToFavorites, removeFromFavorites, addToWatched } = useMovies();

  const movie = getMovieById(id || '');
  const isFavorite = favoriteMovies.some(fav => fav.id === id);

  if (!movie) {
    return (
      <PageContainer>
        <h2>Filme não encontrado</h2>
      </PageContainer>
    );
  }

  const handleComment = (comment: string) => {
    console.log('Novo comentário:', comment);
    
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie.id);
    }
  };

  const handleWatchMovie = () => {
    addToWatched(movie.id);
    console.log('Filme adicionado ao histórico');
  };

  return (
    <PageContainer>
      <MovieInfo>
        <MovieImage src={movie.image} alt={movie.title} />
        <MovieDetails>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieRating>⭐ {movie.rating.toFixed(1)}</MovieRating>
          
          <MovieMeta>
            <p><strong>Gênero:</strong> {movie.genre || 'Ação, Aventura'}</p>
            <p><strong>Diretor:</strong> {movie.director || 'Não informado'}</p>
            <p><strong>Duração:</strong> {movie.duration || '120 min'}</p>
          </MovieMeta>
          
          <MovieDescription>
            {movie.description || 'Uma aventura emocionante que vai te manter na beira do assento do início ao fim.'}
          </MovieDescription>

          <ActionButtons>
            <ActionButton 
              onClick={handleWatchMovie}
              primary
            >
              <FaPlay /> Assistir
            </ActionButton>
            <ActionButton 
              onClick={handleFavoriteToggle}
              isFavorite={isFavorite}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
              {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
            </ActionButton>
          </ActionButtons>
        </MovieDetails>
      </MovieInfo>

      <CommentsSection>
        <SectionTitle>Comentários</SectionTitle>
        <CommentForm onSubmit={handleComment} movieId={movie.id} />
      </CommentsSection>
    </PageContainer>
  );
};

export default MovieDetailsPage;