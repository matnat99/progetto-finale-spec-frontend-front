import { getCorrectImage } from "../utils/imageHelper";
import { useCompare } from "../context/CompareContext";
import { useFavorites } from "../context/FavoriteContext";

export default function GameDetailCard({ game }) {
  const { comparedGames, toggleCompare } = useCompare();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Verifica se il gioco è già stato aggiunto al confronto
  const isInCompare = comparedGames.some((g) => g.id === game.id);

  return (
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
                  <i className="fa-regular fa-heart"></i> Aggiungi ai preferiti
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
