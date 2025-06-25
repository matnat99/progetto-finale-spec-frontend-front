import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCompare } from "../context/CompareContext";
import { useFavorites } from "../context/FavoriteContext";

export default function DetailPage() {
  // ID del gioco dalla URL
  const { id } = useParams();

  // Stato per salvare il gioco corrente
  const [game, setGame] = useState(null);

  // Funzioni dal context di confronto e preferiti
  const { comparedGames, toggleCompare } = useCompare();
  const { toggleFavorite, isFavorite } = useFavorites();

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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{game.title}</h1>

      <p className="mb-2">
        <strong>Categoria:</strong> {game.category}
      </p>
      <p className="mb-2">
        <strong>Piattaforma:</strong> {game.platform ?? "N/D"}
      </p>
      <p className="mb-2">
        <strong>Sviluppatore:</strong> {game.developer ?? "N/D"}
      </p>
      <p className="mb-2">
        <strong>Anno di uscita:</strong> {game.releaseYear ?? "N/D"}
      </p>
      <p className="mb-2">
        <strong>Voto:</strong> {game.rating ?? "N/D"}
      </p>
      <p className="mb-2">
        <strong>Multiplayer:</strong> {game.multiplayer ? "Sì" : "No"}
      </p>
      <p className="mb-4">
        <strong>Prezzo:</strong>{" "}
        {typeof game.price === "number"
          ? `€${game.price.toFixed(2)}`
          : "Prezzo non disponibile"}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => toggleCompare(game)}
          className={`px-4 py-2 rounded ${
            isInCompare ? "bg-red-500" : "bg-blue-500"
          } text-white`}
        >
          {isInCompare ? "Rimuovi dal confronto" : "Aggiungi al confronto"}
        </button>

        <button
          onClick={() => toggleFavorite(game)}
          className="bg-yellow-400 text-white px-4 py-2 rounded"
        >
          {isFavorite(game.id) ? (
            <i className="fa-solid fa-heart"></i>
          ) : (
            <i className="fa-regular fa-heart"></i>
          )}
        </button>
      </div>

      <div className="mt-6">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Torna alla lista
        </Link>
      </div>
    </div>
  );
}
