import { useContext } from "react";
import BlogContext from "./BlogContext";

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within BlogContextProvider");
  }
  return context;
};
