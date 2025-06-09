import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { MovieContextType } from '../types';
import type { Movie } from '../types';
//import { SearchFilters } from '../types';
import { mockAPI, mockMovies } from '../mocks';

const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovies();
    loadUserPreferences();
  }, []);

  const loadMovies = async () => {
    try {
      const moviesData = await mockAPI.getMovies();
      setMovies(moviesData);
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
      setMovies(mockMovies); // Fallback para dados mock
    } finally {
      setLoading(false);
    }
  };

  const loadUserPreferences = () => {
    // Carregar favoritos e histórico do localStorage
    const savedFavorites = localStorage.getItem('favoriteMovies');
    const savedWatched = localStorage.getItem('watchedMovies');

    if (savedFavorites) {
      try {
        const favoriteIds = JSON.parse(savedFavorites);
        const favorites = mockMovies.filter(movie => favoriteIds.includes(movie.id));
        setFavoriteMovies(favorites);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    }

    if (savedWatched) {
      try {
        const watchedIds = JSON.parse(savedWatched);
        const watched = mockMovies.filter(movie => watchedIds.includes(movie.id));
        setWatchedMovies(watched);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      }
    }
  };

  const addToFavorites = (movieId: string) => {
    const movie = movies.find(m => m.id === movieId);
    if (movie && !favoriteMovies.find(m => m.id === movieId)) {
      const newFavorites = [...favoriteMovies, movie];
      setFavoriteMovies(newFavorites);
      
      // Salvar no localStorage
      const favoriteIds = newFavorites.map(m => m.id);
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteIds));
    }
  };

  const removeFromFavorites = (movieId: string) => {
    const newFavorites = favoriteMovies.filter(m => m.id !== movieId);
    setFavoriteMovies(newFavorites);
    
    // Salvar no localStorage
    const favoriteIds = newFavorites.map(m => m.id);
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteIds));
  };

  const addToWatched = (movieId: string) => {
    const movie = movies.find(m => m.id === movieId);
    if (movie && !watchedMovies.find(m => m.id === movieId)) {
      const newWatched = [...watchedMovies, movie];
      setWatchedMovies(newWatched);
      
      // Salvar no localStorage
      const watchedIds = newWatched.map(m => m.id);
      localStorage.setItem('watchedMovies', JSON.stringify(watchedIds));
    }
  };

  const searchMovies = (query: string): Movie[] => {
    if (!query.trim()) return movies;
    
    const lowercaseQuery = query.toLowerCase();
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(lowercaseQuery) ||
      movie.genre?.toLowerCase().includes(lowercaseQuery) ||
      movie.director?.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getMovieById = (id: string): Movie | undefined => {
    return movies.find(movie => movie.id === id);
  };

  const value: MovieContextType = {
    movies,
    favoriteMovies,
    watchedMovies,
    addToFavorites,
    removeFromFavorites,
    addToWatched,
    searchMovies,
    getMovieById,
    loading
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies deve ser usado dentro de um MovieProvider');
  }
  return context;
};
