import { useFavorites } from "../context/FavoriteContext";
import { Link } from "react-router-dom";

// Componente per mostrare la lista dei giochi preferiti
export default function FavoritesPage() {
  // Recupero dei dati e delle funzioni dal context dei preferiti
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Se non ci sono giochi preferiti, mostra un messaggio
  if (favorites.length === 0) {
    return <p className="text-center p-6">Nessun preferito salvato.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">I tuoi preferiti</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {favorites.map((game) => (
          <div
            key={game.id}
            className="border p-4 rounded shadow-sm cursor-pointer"
            onClick={() => (window.location.href = `/videogames/${game.id}`)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{game.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{game.category}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(game);
                }}
                className="text-yellow-600 text-lg"
              >
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
