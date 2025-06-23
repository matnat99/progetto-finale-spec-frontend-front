import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/videogames")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore nel fetch:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center text-lg mt-10">Caricamento...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista Videogiochi</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/videogames/${game.id}`}
            className="block border border-gray-300 rounded-lg p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{game.title}</h2>
            <p className="text-sm text-gray-600">{game.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
