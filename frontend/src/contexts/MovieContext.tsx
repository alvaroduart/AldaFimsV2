import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import MovieData from '../services/api/movies';
import type { Movie } from '../services/api/movies';

interface MovieContextType {
  movies: Movie[];
  currentMovie: Movie | null;
  isLoading: boolean;
  searchResults: Movie[];
  isSearching: boolean;
  searchQuery: string;
  getAllMovies: () => Promise<void>;
  getMovieById: (id: string) => Promise<Movie | null>;
  searchMovies: (query: string) => Promise<void>;
  clearSearch: () => void;
  setCurrentMovie: (movie: Movie | null) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Função para buscar todos os filmes
  const getAllMovies = async () => {
    try {
      setIsLoading(true);
      const response = await MovieData.get_all_movies();
      setMovies(response.data);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para buscar filme por ID
  const getMovieById = async (id: string): Promise<Movie | null> => {
    try {
      setIsLoading(true);
      const response = await MovieData.get_movie_by_id(id);
      const movie = response.data;
      setCurrentMovie(movie);
      return movie;
    } catch (error) {
      console.error('Erro ao buscar filme por ID:', error);
      setCurrentMovie(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Função para pesquisar filmes
  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      clearSearch();
      return;
    }

    try {
      setIsSearching(true);
      setSearchQuery(query);
      const response = await MovieData.seach_movies(query);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Erro ao pesquisar filmes:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Função para limpar resultados de pesquisa
  const clearSearch = () => {
    setSearchResults([]);
    setSearchQuery('');
    setIsSearching(false);
  };

  // Carregar todos os filmes ao montar o componente
  useEffect(() => {
    getAllMovies();
  }, []);

  const contextValue: MovieContextType = {
    movies,
    currentMovie,
    isLoading,
    searchResults,
    isSearching,
    searchQuery,
    getAllMovies,
    getMovieById,
    searchMovies,
    clearSearch,
    setCurrentMovie,
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
