import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCompare } from "../context/CompareContext";

export default function DetailPage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const { comparedGames, toggleCompare } = useCompare();

  const isInCompare = game && comparedGames.some((g) => g.id === game.id);

  useEffect(() => {
    fetch(`http://localhost:3001/videogames/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data.videogame);
        console.log("dati ricevuti", data);
      })
      .catch((err) => console.error("Errore nel fetch:", err));
  }, [id]);

  if (!game) {
    return (
      <div className="p-6 text-center">
        <p>Caricamento gioco...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{game.title}</h1>
      <p className="mb-2">
        <strong>Categoria:</strong> {game.category}
      </p>
      <p className="mb-2">
        <strong>Piattaforma:</strong> {game.platform ?? "N/D"}
      </p>
      <p className="mb-2">
        <strong>Sviluppatore:</strong> {game.developer ?? "N/D"}
      </p>
      <p className="mb-2">
        <strong>Anno di uscita:</strong> {game.releaseYear ?? "N/D"}
      </p>
      <p className="mb-2">
        <strong>Voto:</strong> {game.rating ?? "N/D"}
      </p>
      <p className="mb-2">
        <strong>Multiplayer:</strong> {game.multiplayer ? "Sì" : "No"}
      </p>
      <p className="mb-4">
        <strong>Prezzo:</strong>{" "}
        {typeof game.price === "number"
          ? `€${game.price.toFixed(2)}`
          : "Prezzo non disponibile"}
      </p>

      <button
        onClick={() => toggleCompare(game)}
        className={`px-4 py-2 rounded ${
          isInCompare ? "bg-red-500" : "bg-blue-500"
        } text-white`}
      >
        {isInCompare ? "Rimuovi dal confronto" : "Aggiungi al confronto"}
      </button>

      <div className="mt-6">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Torna alla lista
        </Link>
      </div>
    </div>
  );
}
