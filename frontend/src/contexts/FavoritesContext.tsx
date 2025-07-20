import { createContext, useState } from "react";
import { apiFavorite } from "../services";
import type { Favorite, Movie } from "../types";

interface FavoritesContextType {
  favorites: Favorite[];
  addToFavorites: (movieId: string) => Promise<Favorite>;
  removeFromFavorites: (movieId: string) => Promise<void>;
  getUserFavorites: () => Promise<Favorite[]>;
  isFavorite: (movieId: string) => Promise<boolean>;
  isLoading: boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>({
    favorites: [],
    addToFavorites: async () => ({ userId: '', movie: {} as Movie }),
    removeFromFavorites: async () => {},
    getUserFavorites: async () => [],
    isFavorite: async () => false,
    isLoading: false,
});

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const addToFavorites = async (movieId: string): Promise<Favorite> => {
    setIsLoading(true);
    try {
      // Simulate API call to add movie to favorites
      const updatedFavorites = await apiFavorite.add_to_favorite(movieId);
      
      return updatedFavorites.data;
    } catch (error) {
      console.error("Error adding to favorites:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
}
    const removeFromFavorites = async (movieId: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call to remove movie from favorites
      await apiFavorite.remove_favorites(movieId);
      setFavorites(prev => prev.filter(favorite => favorite.movie.id !== movieId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserFavorites = async (): Promise<Favorite[]> => {
    setIsLoading(true);
    try {
      // Simulate API call to get user's favorite movies
      const userFavorites = await apiFavorite.get_user_favorites();
      setFavorites(userFavorites.data);
      return userFavorites.data;
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isFavorite = async (movieId: string): Promise<boolean> => {
    await getUserFavorites()
    return favorites.some(favorite => favorite.movie.id === movieId);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, getUserFavorites, isFavorite, isLoading }}>
      {children}
    </FavoritesContext.Provider>
  );
};
