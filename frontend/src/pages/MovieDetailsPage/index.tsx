import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovies } from '../../contexts/MovieContext';
import { useAuth } from '../../contexts/AuthContext';
import CommentForm from '../../components/CommentForm';
import { FaHeart, FaRegHeart, FaPlay, FaStar, FaRegStar } from 'react-icons/fa';
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
  MovieMeta,
  UserRatingContainer,
  RatingText,
  StarButton,
  LoginPrompt
} from './styles';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovieById, favoriteMovies, addToFavorites, removeFromFavorites, addToWatched } = useMovies();
  const { isAuthenticated, user } = useAuth();

  const movie = getMovieById(id || '');
  const isFavorite = favoriteMovies.some(fav => fav.id === id);

  const [userRating, setUserRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);

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

  const handleStarClick = (starValue: number) => {
    if (!isAuthenticated) {
      return; // Não permite avaliação se não estiver logado
    }
    setUserRating(starValue);
    // Mock: aqui seria feita a chamada para a API para salvar a avaliação
    console.log(`Usuário ${user?.name} avaliou o filme ${movie.title} com ${starValue} estrelas`);
  };

  const handleStarHover = (starValue: number) => {
    if (!isAuthenticated) {
      return; // Não permite hover se não estiver logado
    }
    setHoveredStar(starValue);
  };

  const handleStarLeave = () => {
    if (!isAuthenticated) {
      return;
    }
    setHoveredStar(0);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredStar || userRating);
      stars.push(
        <StarButton
          key={i}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
          filled={isFilled}
          disabled={!isAuthenticated}
        >
          {isFilled ? <FaStar /> : <FaRegStar />}
        </StarButton>
      );
    }
    return stars;
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

          <UserRatingContainer>
            {isAuthenticated ? (
              <>
                <RatingText>Sua avaliação:</RatingText>
                <div className="stars">
                  {renderStars()}
                </div>
              </>
            ) : (
              <LoginPrompt>
                <RatingText>Para avaliar este filme, você precisa estar logado.</RatingText>
                <Link to="/login">Fazer login</Link>
              </LoginPrompt>
            )}
          </UserRatingContainer>

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