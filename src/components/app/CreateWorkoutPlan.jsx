import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCreateWorkoutPlan } from "../../utils/useCreateWorkoutPlan";

export default function CreateWorkoutPlan() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const { createPlan, loading } = useCreateWorkoutPlan();

  const handleCreatePlan = async () => {
    try {
      await createPlan(user?.id, title);
      alert("Workout plan creato con successo!");
      setTitle("");
    } catch (error) {
      alert("Errore: " + error.message);
    }
  };

  return (
    <div>
      <h3>Crea nuovo Workout Plan</h3>
      <input
        type="text"
        placeholder="Titolo workout plan"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleCreatePlan} disabled={loading}>
        {loading ? "Salvataggio..." : "Crea"}
      </button>
    </div>
  );
}
