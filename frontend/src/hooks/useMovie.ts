import { useContext } from "react";
import MovieContext from "../contexts/MovieContext";

export function useMovie() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovie deve ser usado com MovieProvider");
  }
  return context;
}
