import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("http://localhost:3001/videogames")
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  const filteredSortedGames = useMemo(() => {
    return [...games]
      .filter((game) => {
        const matchTitle = game.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchCategory = category === "all" || game.category === category;
        return matchTitle && matchCategory;
      })
      .sort((a, b) => {
        const fieldA = a[sortField].toLowerCase?.() ?? a[sortField];
        const fieldB = b[sortField].toLowerCase?.() ?? b[sortField];
        if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
        if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [games, search, category, sortField, sortOrder]);

  const uniqueCategories = [...new Set(games.map((g) => g.category))];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Videogiochi</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
        <input
          type="text"
          placeholder="Cerca per titolo..."
          className="border px-3 py-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">Tutte le categorie</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="border px-2 py-2 rounded"
          >
            <option value="title">Titolo</option>
            <option value="category">Categoria</option>
          </select>

          <button
            className="px-3 py-2 border rounded bg-gray-100 hover:bg-gray-200"
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            {sortOrder === "asc" ? "⬇️ A-Z" : "⬆️ Z-A"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredSortedGames.map((game) => (
          <Link
            key={game.id}
            to={`/videogames/${game.id}`}
            className="block border border-gray-300 rounded-lg p-4 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{game.title}</h2>
            <p className="text-sm text-gray-600">{game.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
