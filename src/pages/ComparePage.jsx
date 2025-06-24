import { useCompare } from "../context/CompareContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ComparePage() {
  const { comparedGames, clearCompare } = useCompare();
  const [fullGames, setFullGames] = useState([]);

  useEffect(() => {
    if (comparedGames.length === 2) {
      Promise.all(
        comparedGames.map((game) =>
          fetch(`http://localhost:3001/videogames/${game.id}`)
            .then((res) => res.json())
            .then((data) => data.videogame)
        )
      ).then(setFullGames);
    }
  }, [comparedGames]);

  if (comparedGames.length !== 2) {
    return (
      <div className="p-6 text-center">
        <p>Seleziona 2 giochi dalla lista per confrontarli.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Torna alla lista
        </Link>
      </div>
    );
  }

  if (fullGames.length !== 2) {
    return <div className="p-6 text-center">Caricamento giochi...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Confronto</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fullGames.map((game) => (
          <div key={game.id} className="border rounded p-4 shadow-sm">
            <h2 className="text-xl font-bold mb-2">{game.title}</h2>
            <p>
              <strong>Categoria:</strong> {game.category}
            </p>
            <p>
              <strong>Piattaforma:</strong> {game.platform ?? "N/D"}
            </p>
            <p>
              <strong>Sviluppatore:</strong> {game.developer ?? "N/D"}
            </p>
            <p>
              <strong>Anno:</strong> {game.releaseYear ?? "N/D"}
            </p>
            <p>
              <strong>Voto:</strong> {game.rating ?? "N/D"}
            </p>
            <p>
              <strong>Multiplayer:</strong> {game.multiplayer ? "Sì" : "No"}
            </p>
            <p>
              <strong>Prezzo:</strong>{" "}
              {typeof game.price === "number"
                ? `€${game.price.toFixed(2)}`
                : "Prezzo non disponibile"}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={clearCompare}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Svuota confronto
        </button>
      </div>
    </div>
  );
}
