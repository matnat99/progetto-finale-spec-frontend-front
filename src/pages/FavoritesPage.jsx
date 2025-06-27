import { useFavorites } from "../context/FavoriteContext";
import { Link, useNavigate } from "react-router-dom";
import { getCorrectImage } from "../utils/imageHelper";

// Recupero dei dati e delle funzioni dal context dei preferiti
export default function FavoritesPage() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  // Se non ci sono giochi preferiti, mostra un messaggio
  if (favorites.length === 0) {
    return (
      <p className="text-center p-6 text-gray-600">Nessun preferito salvato.</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 font-medium text-sm cursor-pointer"
        >
          <i class="fa-solid fa-arrow-left"></i> Torna indietro
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        I tuoi preferiti
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((game) => (
          <div
            key={game.id}
            className="bg-gray-800 text-white rounded-lg shadow-md p-4 cursor-pointer"
            onClick={() => navigate(`/videogames/${game.id}`)}
          >
            <img
              src={getCorrectImage(game)}
              alt={game.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{game.title}</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(game);
                }}
                className="text-yellow-400 text-lg cursor-pointer"
              >
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
            <p className="text-sm text-gray-300">{game.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
