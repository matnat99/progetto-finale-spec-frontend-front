import { useNavigate } from "react-router-dom";
import { getCorrectImage } from "../utils/imageHelper";
import { useCompare } from "../context/CompareContext";
import { useFavorites } from "../context/FavoriteContext";

export default function GameCard({ game }) {
  const navigate = useNavigate();
  const { toggleCompare, comparedGames } = useCompare();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isCompared = comparedGames.some((g) => g.id === game.id);

  return (
    <div
      className={`bg-gray-800 text-white border border-blue-900 rounded-lg p-4 hover:shadow-md transition cursor-pointer ${
        isCompared ? "border-blue-500" : ""
      }`}
      onClick={() => navigate(`/videogames/${game.id}`)}
    >
      <img
        src={getCorrectImage(game)}
        alt={game.title}
        className="w-full h-48 object-cover rounded mb-2"
      />
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">{game.title}</h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(game);
          }}
          className="text-lg text-yellow-600 cursor-pointer"
        >
          {isFavorite(game.id) ? (
            <i className="fa-solid fa-heart"></i>
          ) : (
            <i className="fa-regular fa-heart"></i>
          )}
        </button>
      </div>

      <p className="text-sm">{game.category}</p>

      <div className="flex justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(game);
          }}
          className={`mt-4 text-sm px-3 py-1 rounded transition font-medium cursor-pointer ${
            isCompared
              ? "bg-red-700 text-white hover:bg-red-500"
              : "bg-blue-700 text-white hover:bg-blue-500"
          }`}
        >
          {isCompared ? (
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
      </div>
    </div>
  );
}
