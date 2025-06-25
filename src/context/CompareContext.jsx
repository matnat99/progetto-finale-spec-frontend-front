import { createContext, useContext, useState } from "react";

// Creazione del contesto per la funzionalità di confronto giochi
const CompareContext = createContext();

// Provider che fornisce accesso al contesto del confronto
export function CompareProvider({ children }) {
  // Stato che tiene traccia dei giochi selezionati per il confronto
  const [comparedGames, setComparedGames] = useState([]);

  // Funzione per aggiungere o rimuovere un gioco dal confronto
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

  // Funzione per svuotare il confronto
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
