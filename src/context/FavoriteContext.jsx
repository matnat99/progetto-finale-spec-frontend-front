import { createContext, useContext, useEffect, useState } from "react";

// Creazione del contesto per i preferiti
const FavoriteContext = createContext();

// Provider che avvolge l'app e fornisce l'accesso al contesto dei preferiti
export function FavoritesProvider({ children }) {
  // Stato iniziale con recupero da localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Errore nel parsing dei preferiti:", error);
      return [];
    }
  });

  // Effetto che aggiorna localStorage ogni volta che cambia lo stato dei preferiti
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Errore nel salvataggio dei preferiti:", error);
    }
  }, [favorites]);

  // Funzione per aggiungere o rimuovere un gioco dai preferiti
  const toggleFavorite = (game) => {
    setFavorites((curr) => {
      const alreadyInFavorites = curr.some((g) => g.id === game.id);
      if (alreadyInFavorites) {
        return curr.filter((g) => g.id !== game.id);
      } else {
        return [...curr, game];
      }
    });
  };

  // Funzione per verificare se un gioco è nei preferiti
  const isFavorite = (id) => {
    return favorites.some((g) => g.id === id);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoriteContext);
