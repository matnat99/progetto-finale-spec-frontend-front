import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (game) => {
    setFavorites((curr) => {
      const exists = curr.some((g) => g.id === game.id);
      if (exists) {
        return curr.filter((g) => g.id !== game.id);
      } else {
        return [...curr, game];
      }
    });
  };

  const isFavorite = (id) => favorites.some((g) => g.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
