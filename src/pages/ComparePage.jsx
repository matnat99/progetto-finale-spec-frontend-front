import { useCompare } from "../context/CompareContext";
import { Link } from "react-router-dom";

export default function ComparePage() {
  const { comparedGames, clearCompare } = useCompare();

  if (comparedGames.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg mb-4">
          Nessun gioco selezionato per il confronto.
        </p>
        <Link to="/" className="text-blue-600 hover:underline">
          Torna alla lista
        </Link>
      </div>
    );
  }

  if (comparedGames.length < 2) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4 text-gray-600">
          Seleziona almeno 2 giochi dalla lista per poterli confrontare.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Torna alla lista
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Confronto</h1>

      <div
        className={`grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-${Math.min(
          comparedGames.length,
          4
        )}`}
      >
        {comparedGames.map((game) => (
          <div key={game.id} className="border rounded p-4 shadow-sm">
            <h2 className="text-xl font-bold mb-2">{game.title ?? "N/D"}</h2>
            <p>
              <strong>Categoria:</strong> {game.category ?? "N/D"}
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
              <strong>Multiplayer:</strong>{" "}
              {game.multiplayer != null
                ? game.multiplayer
                  ? "Sì"
                  : "No"
                : "N/D"}
            </p>
            <p>
              <strong>Prezzo:</strong>{" "}
              {typeof game.price === "number"
                ? `€${game.price.toFixed(2)}`
                : "N/D"}
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
