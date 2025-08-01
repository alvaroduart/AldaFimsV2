import type { ReactNode } from 'react';

export interface Movie {
  id: string;
  title: string;
  image: string;
  rating: number;
  description?: string;
  year?: number;
  genre?: string;
  duration?: string;
  director?: string;
  cast?: string[];
  userRating?: number; // Avaliação do usuário
}

export interface Favorite{
  userId:string,
  movie: Movie,
}

export interface History{
  userId: string;
  movie: Movie;
}

export interface User {
  id?: string;
  username: string;
  email: string;
  password?: string;
}

export interface UserToken {
  accessToken: string;
  type: string;
  user: User;
}

export interface Comment {
  id?: string;
  movieId: string;
  userId: string;
  user: User;
  userName: string;
  content: string;
  createdAt: Date;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface MovieContextType {
  movies: Movie[];
  favoriteMovies: Movie[];
  watchedMovies: Movie[];
  addToFavorites: (movieId: string) => void;
  removeFromFavorites: (movieId: string) => void;
  addToWatched: (movieId: string) => void;
  removeFromWatched: (movieId: string) => void;
  searchMovies: (query: string) => Movie[];
  getMovieById: (id: string) => Movie | undefined;
  loading: boolean;
}

export interface SearchFilters {
  genre?: string;
  year?: number;
  rating?: number;
  sortBy?: 'title' | 'rating' | 'year';
  sortOrder?: 'asc' | 'desc';
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type { ReactNode };


