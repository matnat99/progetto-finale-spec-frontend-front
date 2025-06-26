import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoriteContext";
import { useCompare } from "../context/CompareContext";

export default function Header() {
  const { favorites } = useFavorites();
  const { comparedGames } = useCompare();

  const hasFavorites = favorites.length > 0;
  const hasCompared = comparedGames.length > 0;

  return (
    <header className="bg-gray-800 text-white">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold transition">
          🎮 GameCompare
        </Link>

        <div className="flex gap-6 items-center text-sm relative">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>

          <Link
            to="/compare"
            className="relative hover:text-yellow-400 transition"
          >
            <i className="fa-solid fa-scale-balanced text-lg"></i>
            {hasCompared && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
                {comparedGames.length}
              </span>
            )}
          </Link>

          <Link
            to="/favorites"
            className="relative hover:text-blue-400 transition"
          >
            <i
              className={`fa-heart text-lg ${
                hasFavorites
                  ? "fa-solid text-yellow-400"
                  : "fa-regular text-white"
              }`}
            ></i>
            {hasFavorites && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
