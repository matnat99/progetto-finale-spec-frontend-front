import { useCompare } from "../context/CompareContext";
import { useFavorites } from "../context/FavoriteContext";
import { Link, useNavigate } from "react-router-dom";
import { getCorrectImage } from "../utils/imageHelper";

export default function ComparePage() {
  // Ottieni i giochi da confrontare e le funzioni per gestirli
  const { comparedGames, clearCompare, toggleCompare } = useCompare();

  // Funzioni per gestire i preferiti
  const { toggleFavorite, isFavorite } = useFavorites();

  const navigate = useNavigate();

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
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 font-medium text-sm cursor-pointer"
        >
          <i class="fa-solid fa-arrow-left"></i> Torna indietro
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Confronto
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparedGames.map((game) => (
          <div
            key={game.id}
            className="border rounded-lg p-4 shadow-sm bg-gray-800 text-white flex justify-between gap-6 cursor-pointer"
          >
            <div>
              <h2 className="text-xl font-bold">{game.title}</h2>

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

            <div className="flex flex-col items-end w-1/2">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => toggleFavorite(game)}
                  className={`text-lg cursor-pointer ${
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
                  className="text-gray-400 hover:text-red-600 text-lg cursor-pointer"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <img
                src={getCorrectImage(game)}
                alt={game.title}
                className="w-full h-auto object-cover rounded shadow"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={clearCompare}
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded shadow-lg transition z-50 cursor-pointer"
        >
          Svuota confronto
        </button>
      </div>
    </div>
  );
}
