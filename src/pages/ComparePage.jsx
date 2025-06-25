import { useCompare } from "../context/CompareContext";
import { useFavorites } from "../context/FavoriteContext";
import { Link } from "react-router-dom";

export default function ComparePage() {
  // Ottieni i giochi da confrontare e le funzioni per gestirli
  const { comparedGames, clearCompare, toggleCompare } = useCompare();

  // Funzioni per gestire i preferiti
  const { toggleFavorite, isFavorite } = useFavorites();

  // Se ci sono meno di 2 giochi da confrontare, mostra un messaggio
  if (comparedGames.length < 2) {
    return (
      <div className="p-6 text-center">
        <p>Seleziona almeno 2 giochi per confrontarli.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Torna alla lista
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Confronto</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparedGames.map((game) => (
          <div key={game.id} className="border rounded p-4 shadow-sm bg-white">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-xl font-bold">{game.title}</h2>
              </div>

              {/* Azioni: aggiungi ai preferiti e rimuovi dal confronto */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFavorite(game)}
                  className={`text-lg ${
                    isFavorite(game.id) ? "text-yellow-600" : "text-gray-400"
                  }`}
                >
                  <i
                    className={`fa-heart ${
                      isFavorite(game.id) ? "fa-solid" : "fa-regular"
                    }`}
                  ></i>
                </button>

                <button
                  onClick={() => toggleCompare(game)}
                  title="Rimuovi dal confronto"
                  className="text-gray-400 hover:text-red-600 text-lg"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            <p>
              <strong>Categoria:</strong> {game.category}
            </p>
            <p>
              <strong>Piattaforma:</strong> {game.platform ?? "N/D"}
            </p>
            <p>
              <strong>Sviluppatore:</strong> {game.developer ?? "N/D"}
            </p>
            <p>
              <strong>Anno:</strong> {game.releaseYear ?? "N/D"}
            </p>
            <p>
              <strong>Voto:</strong> {game.rating ?? "N/D"}
            </p>
            <p>
              <strong>Multiplayer:</strong>{" "}
              {game.multiplayer === true
                ? "Sì"
                : game.multiplayer === false
                ? "No"
                : "N/D"}
            </p>
            <p>
              <strong>Prezzo:</strong>{" "}
              {typeof game.price === "number"
                ? `€${game.price.toFixed(2)}`
                : "Prezzo non disponibile"}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={clearCompare}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Svuota confronto
        </button>
      </div>
    </div>
  );
}
