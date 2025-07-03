import React from "react";
import useExercises from "../../utils/useExercises";


export default function ExerciseFetcher() {
  const { exercises, loading, error } = useExercises();

  if (loading) return <p>🔄 Caricamento esercizi...</p>;
  if (error) return <p>❌ Errore: {error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>📋 Esercizi salvati</h1>

      {exercises?.slice(0, 10).map((ex) => (
        <div key={ex.id} style={{ marginBottom: "2rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
          <h2>{ex.name}</h2>
          <p>
            <strong>Target:</strong> {ex.target} | <strong>Body part:</strong> {ex.bodyPart} |{" "}
            <strong>Equipment:</strong> {ex.equipment}
          </p>
          <img
            src={ex.gifUrl || ex.gif_url || `/gifs/${ex.id}.gif`}
            alt={ex.name}
            width={250}
            style={{ borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
          />
        </div>
      ))}
    </div>
  );
}
