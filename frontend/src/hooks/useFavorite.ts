import { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";

export function useFavorite() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorite deve ser usado com FavoriteProvider");
  }
  return context;
}
