import { createContext, useState } from "react";
import { apiHistory } from "../services";
import type { Favorite, Movie } from "../types";

interface HistoryContextType {
  history: Favorite[];
  addToHistory: (movieId: string) => Promise<Favorite>;
  removeFromHistory: (movieId: string) => Promise<void>;
  getUserHistory: () => Promise<Favorite[]>;
  isInHistory: (movieId: string) => Promise<boolean>;
  isLoading: boolean;
}

export const HistoryContext = createContext<HistoryContextType | undefined>({
    history: [],
    addToHistory: async () => ({ userId: '', movie: {} as Movie }),
    removeFromHistory: async () => {},
    getUserHistory: async () => [],
    isInHistory: async () => false,
    isLoading: false,
});

interface HistoryProviderProps {
  children: React.ReactNode;
}

export const HistoryProvider: React.FC<HistoryProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<Favorite[]>([]);

  const addToHistory = async (movieId: string): Promise<Favorite> => {
    setIsLoading(true);
    try {
      // Simulate API call to add movie to history
      const updatedHistory = await apiHistory.add_to_history(movieId);
      
      return updatedHistory.data;
    } catch (error) {
      console.error("Error adding to history:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
}
    const removeFromHistory = async (movieId: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call to remove movie from favorites
      await apiHistory.remove_from_history(movieId);
      setHistory(prev => prev.filter(favorite => favorite.movie.id !== movieId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserHistory = async (): Promise<Favorite[]> => {
    setIsLoading(true);
    try {
      // Simulate API call to get user's favorite movies
      const userHistory = await apiHistory.get_user_history();
      setHistory(userHistory.data);
      return userHistory.data;
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isInHistory = async (movieId: string): Promise<boolean> => {
    await getUserHistory();
    return history.some(favorite => favorite.movie.id === movieId);
  }

  return (
    <HistoryContext.Provider value={{ history, addToHistory, removeFromHistory, getUserHistory, isInHistory, isLoading }}>
      {children}
    </HistoryContext.Provider>
  );
};
