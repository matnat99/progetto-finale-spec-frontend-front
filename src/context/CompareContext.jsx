import { createContext, useContext, useState } from "react";

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [comparedGames, setComparedGames] = useState([]);

  const toggleCompare = (game) => {
    const alreadyIn = comparedGames.find((g) => g.id === game.id);

    if (alreadyIn) {
      setComparedGames((prev) => prev.filter((g) => g.id !== game.id));
    } else if (comparedGames.length < 2) {
      setComparedGames((prev) => [...prev, game]);
    } else {
      alert("Puoi confrontare solo 2 giochi alla volta.");
    }
  };

  const clearCompare = () => setComparedGames([]);

  return (
    <CompareContext.Provider
      value={{ comparedGames, toggleCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);
