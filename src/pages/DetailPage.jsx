import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCompare } from "../context/CompareContext";
import { useFavorites } from "../context/FavoriteContext";
import { getCorrectImage } from "../utils/imageHelper";

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

      <div className="bg-gray-800 text-white rounded-lg shadow-md p-6">
        <div className="md:flex md:gap-6">
          <div className="flex-1">
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
              <strong>Multiplayer:</strong>{" "}
              {game.multiplayer === true
                ? "Sì"
                : game.multiplayer === false
                ? "No"
                : "N/D"}
            </p>
            <p className="mb-4">
              <strong>Prezzo:</strong>{" "}
              {typeof game.price === "number"
                ? `€${game.price.toFixed(2)}`
                : "Prezzo non disponibile"}
            </p>
          </div>

          <div className="mt-6 md:mt-0 md:w-1/2">
            <img
              src={getCorrectImage(game)}
              alt={game.title}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />

            <div className="flex gap-3 mt-12 justify-end">
              <button
                onClick={() => toggleCompare(game)}
                className={`px-4 py-2 rounded text-sm cursor-pointer ${
                  isInCompare
                    ? "bg-red-700 hover:bg-red-500"
                    : "bg-blue-700 hover:bg-blue-500"
                } text-white hover:opacity-90 transition`}
              >
                {isInCompare ? (
                  <span>
                    <i className="fa-solid fa-scale-balanced"></i> Rimuovi dal
                    confronto
                  </span>
                ) : (
                  <span>
                    <i className="fa-solid fa-scale-balanced"></i> Aggiungi al
                    confronto
                  </span>
                )}
              </button>
              <button
                onClick={() => toggleFavorite(game)}
                className="px-4 py-2 rounded bg-yellow-400 text-white hover:opacity-90 transition text-sm cursor-pointer"
              >
                {isFavorite(game.id) ? (
                  <span>
                    <i className="fa-solid fa-heart"></i> Rimuovi dai preferiti
                  </span>
                ) : (
                  <span>
                    <i className="fa-regular fa-heart"></i> Aggiungi ai
                    preferiti
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
