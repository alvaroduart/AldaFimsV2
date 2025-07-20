import { useContext } from "react";
import { CommentsContext } from "../contexts/CommentsContext";

export function useComments() {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useComments deve ser usado com CommentsProvider");
  }
  return context;
}
