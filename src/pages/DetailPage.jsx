import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailPage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/videogames/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gioco non trovato");
        return res.json();
      })
      .then((data) => {
        console.log("Dati ricevuti:", data);
        setGame(data.videogame);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore:", err);
        setGame(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Caricamento...</p>;
  if (!game) return <p className="text-center mt-10">Gioco non trovato</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline">
        &larr; Torna alla lista
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-6">{game.title}</h1>

      <div className="grid gap-3 text-lg">
        <p>
          <strong>Categoria:</strong> {game.category}
        </p>
        <p>
          <strong>Piattaforma:</strong> {game.platform}
        </p>
        <p>
          <strong>Sviluppatore:</strong> {game.developer}
        </p>
        <p>
          <strong>Anno di uscita:</strong> {game.releaseYear}
        </p>
        <p>
          <strong>Voto:</strong> {game.rating}
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
    </div>
  );
}
