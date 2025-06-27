import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import { useFavorites } from "../context/FavoriteContext";
import { getCorrectImage } from "../utils/imageHelper";
import GameCard from "../components/GameCard";

export default function HomePage() {
  // Stati locali per gestire giochi, ricerca, filtri e ordinamento
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  // Recupera funzioni e stati globali da context
  const { toggleCompare, comparedGames } = useCompare();
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  // Fetch iniziale dei videogiochi
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("http://localhost:3001/videogames");
        const data = await res.json();
        setGames(data);
      } catch (error) {
        console.error("Errore nel caricamento dei videogiochi:", error);
      }
    };
    fetchGames();
  }, []);

  // Effetto debounce per la ricerca
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search]);

  // Filtra e ordina i giochi in base a ricerca, categoria e ordinamento
  const filteredSortedGames = useMemo(() => {
    return [...games]
      .filter((game) => {
        const matchTitle = game.title
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());
        const matchCategory = category === "all" || game.category === category;
        return matchTitle && matchCategory;
      })
      .sort((a, b) => {
        const fieldA = a[sortField]?.toLowerCase?.() ?? a[sortField];
        const fieldB = b[sortField]?.toLowerCase?.() ?? b[sortField];

        if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
        if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [games, debouncedSearch, category, sortField, sortOrder]);

  // Ricava le categorie uniche per il filtro
  const uniqueCategories = [...new Set(games.map((g) => g.category))];

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
          {/* Ricerca per titolo */}
          <input
            type="text"
            placeholder="Cerca per titolo..."
            className="border border-blue-900 px-3 py-2 rounded w-full md:w-1/3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Filtro per categoria */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-blue-900 px-3 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 cursor-pointer"
          >
            <option value="all">Tutte le categorie</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Ordinamento per campo e direzione */}
          <div className="flex items-center gap-2">
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="border border-blue-900 px-2 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 cursor-pointer"
            >
              <option value="title">Titolo</option>
              <option value="category">Categoria</option>
            </select>

            <button
              className="px-3 py-2 border border-blue-900 rounded bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 cursor-pointer"
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
            >
              {sortOrder === "asc" ? "⬇️ A-Z" : "⬆️ Z-A"}
            </button>
          </div>
        </div>

        {/* Lista dei giochi filtrati e ordinati */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredSortedGames.length > 0 ? (
            filteredSortedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Nessun videogioco trovato.
            </p>
          )}
        </div>
      </div>

      {comparedGames.length > 1 && comparedGames.length <= 4 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Link
            to="/compare"
            className="bg-blue-900 text-white hover:bg-blue-700 px-5 py-3 rounded shadow-lg  transition cursor-pointer"
          >
            Vai al confronto
          </Link>
        </div>
      )}
    </div>
  );
}
