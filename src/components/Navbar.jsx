import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoriteContext";

export default function Navbar() {
  const { favorites } = useFavorites();
  const hasFavorites = favorites.length > 0;

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-white hover:text-gray-300"
        >
          🎮 GameCompare
        </Link>

        <Link
          to="/favorites"
          className="flex items-center gap-2 text-yellow-400 hover:underline"
        >
          <i className={`fa-heart ${hasFavorites ? "fas" : "far"}`}></i>(
          {favorites.length})
        </Link>
      </div>
    </nav>
  );
}
