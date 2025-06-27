import { useFavorites } from "../context/FavoriteContext";
import { useNavigate } from "react-router-dom";
import GameCard from "../components/GameCard";

// Recupero dei dati e delle funzioni dal context dei preferiti
export default function FavoritesPage() {
  const { favorites } = useFavorites();
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
          <i className="fa-solid fa-arrow-left"></i> Torna indietro
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        I tuoi preferiti
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
