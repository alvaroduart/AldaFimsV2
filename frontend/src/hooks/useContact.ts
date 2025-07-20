    import { useContext } from "react";
import { ContactContext } from "../contexts/ContactContext";

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useComments deve ser usado com CommentsProvider");
  }
  return context;
}
