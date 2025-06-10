import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
//import { useMovies } from '../../contexts/MovieContext';
import { CardContainer, MovieImage, MovieTitle, MovieRating, RatingContainer } from './styles';

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
 
}) => {  

  const handleClick = () => {
    if (onClick) {
      onClick();
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
      </Link>
    </CardContainer>
  );
};

export default MovieCard;
