import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCompare } from "../context/CompareContext";
import { useFavorites } from "../context/FavoriteContext";
import { getCorrectImage } from "../utils/imageHelper";
import GameDetailCard from "../components/GameDetailCard";

export default function DetailPage() {
  // ID del gioco dalla URL
  const { id } = useParams();

  // Stato per salvare il gioco corrente
  const [game, setGame] = useState(null);

  // Funzioni dal context di confronto e preferiti
  const { comparedGames, toggleCompare } = useCompare();
  const { toggleFavorite, isFavorite } = useFavorites();

  const navigate = useNavigate();

  // Verifica se il gioco è già stato aggiunto al confronto
  const isInCompare = game && comparedGames.some((g) => g.id === game.id);

  // Effetto per caricare i dati del gioco quando cambia l'ID
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`http://localhost:3001/videogames/${id}`);
        const data = await res.json();
        if (data?.videogame) setGame(data.videogame);
      } catch (error) {
        console.error("Errore nel caricamento del gioco:", error);
      }
    };
    fetchGame();
  }, [id]);

  if (!game) {
    return (
      <div className="p-6 text-center">
        <p>Caricamento gioco...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 font-medium text-sm cursor-pointer"
        >
          <i class="fa-solid fa-arrow-left"></i> Torna indietro
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Dettagli
      </h1>
      <GameDetailCard game={game} />
    </div>
  );
}
