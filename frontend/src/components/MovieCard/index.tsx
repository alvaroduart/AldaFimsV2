import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useMovies } from '../../contexts/MovieContext';
import { CardContainer, MovieImage, MovieTitle, MovieRating, RatingContainer, FavoriteButton } from './styles';

interface MovieCardProps {
  id: string;
  title: string;
  image: string;
  rating: number;
  onClick?: () => void;
  showFavoriteButton?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  id, 
  title, 
  image, 
  rating, 
  onClick,
  showFavoriteButton = true 
}) => {
  const { favoriteMovies, addToFavorites, removeFromFavorites } = useMovies();
  const isFavorite = favoriteMovies.some(movie => movie.id === id);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  return (
    <CardContainer onClick={handleClick}>
      <Link to={`/filme/${id}`}>
        <MovieImage src={image} alt={title} />
        <MovieTitle>{title}</MovieTitle>
        <RatingContainer>
          <FaStar />
          <MovieRating>{rating.toFixed(1)}</MovieRating>
        </RatingContainer>
        {showFavoriteButton && (
          <FavoriteButton 
            onClick={handleFavoriteClick}
            isFavorite={isFavorite}
            title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </FavoriteButton>
        )}
      </Link>
    </CardContainer>
  );
};

export default MovieCard;
