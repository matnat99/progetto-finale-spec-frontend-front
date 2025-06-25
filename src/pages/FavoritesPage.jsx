import { useFavorites } from "../context/FavoriteContext";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Preferiti</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">
          Nessun gioco nei preferiti.{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Torna alla lista
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((game) => (
            <div
              key={game.id}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{game.title}</h2>
              <p className="text-sm text-gray-600">{game.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
