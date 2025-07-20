import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovie } from '../../hooks/useMovie';
import { useAuth } from '../../hooks/useAuth';
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
import { useFavorite } from '../../hooks/useFavorite';
import { useHistory } from '../../hooks/useHistory';
import type { Movie } from '../../types';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorite();
  const { getMovieById, addRating, updateRating } = useMovie();
  const {  addToHistory } = useHistory();
  const { isAuthenticated, user } = useAuth();
  const [movie, setMovie] = useState<Movie|null>(null);
  const [isFavoriteUser, setIsFavoriteUser] = useState(false);
  //const [isInHistoryUser, setIsInHistoryUser] = useState(false);

 

  const [userRating, setUserRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  useEffect(() => {

    const fetchMovie = async () => {
      const movieData = await getMovieById(id || '');
      if (movieData) {
        setMovie(movieData);
        if (movieData.userRating){
          setUserRating(movieData.userRating);
        }
      }
    };
    
    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchUser=async () =>{
      if (isAuthenticated && user && movie) {
        const inFavorites = await isFavorite(movie.id);
        //const inHistory = await isInHistory(movie.id);

        // Check if the movie is in user's favorites or history
        setIsFavoriteUser(inFavorites);
    
    }
    }
    fetchUser();
}, [isAuthenticated, user]);

  if (!id || !movie) {
    return (
      <PageContainer>
        <h2>Filme não encontrado</h2>
      </PageContainer>
    );
  }

  const handleFavoriteToggle = () => {
    if (isFavoriteUser) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie.id);
    }
  };

  const handleWatchMovie = async () => {
    await addToHistory(movie.id);
    console.log('Filme adicionado ao histórico');
  };

  const handleStarClick = async (starValue: number) => {
    if (!isAuthenticated) {
      return; // Não permite avaliação se não estiver logado
    }
    setUserRating(starValue);
    if(movie.userRating){
      await updateRating(movie.id, starValue);
    }else{ 
      await addRating(movie.id, starValue);
    }
    
    movie.userRating=starValue
    // Mock: aqui seria feita a chamada para a API para salvar a avaliação
    console.log(`Usuário ${user?.username} avaliou o filme ${movie.title} com ${starValue} estrelas`);
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
              isFavorite={isFavoriteUser}
            >
              {isFavoriteUser ? <FaHeart /> : <FaRegHeart />}
              {isFavoriteUser ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
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
        <CommentForm movieId={movie.id} />
      </CommentsSection>
    </PageContainer>
  );
};

export default MovieDetailsPage;