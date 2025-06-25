import { useFavorites } from "../context/FavoriteContext";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <p className="text-center p-6">Nessun preferito salvato.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">I tuoi preferiti</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {favorites.map((game) => (
          <Link to={`/videogames/${game.id}`}>
            <div key={game.id} className="border p-4 rounded shadow-sm">
              <h2 className="text-xl font-bold">{game.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{game.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
