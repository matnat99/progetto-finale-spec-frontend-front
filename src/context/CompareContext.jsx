import { createContext, useContext, useState } from "react";

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [comparedGames, setComparedGames] = useState([]);

  const toggleCompare = async (game) => {
    const exists = comparedGames.some((g) => g.id === game.id);

    if (exists) {
      setComparedGames((curr) => curr.filter((g) => g.id !== game.id));
    } else {
      if (comparedGames.length >= 4) {
        alert("Puoi confrontare al massimo 4 giochi.");
        return;
      }

      try {
        const res = await fetch(`http://localhost:3001/videogames/${game.id}`);
        const data = await res.json();
        if (data?.videogame) {
          setComparedGames((curr) => [...curr, data.videogame]);
        }
      } catch (err) {
        console.error("Errore nel recuperare i dettagli del gioco:", err);
      }
    }
  };

  const clearCompare = () => {
    setComparedGames([]);
  };

  return (
    <CompareContext.Provider
      value={{
        comparedGames,
        toggleCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
