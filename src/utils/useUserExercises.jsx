import { useState } from "react";
import supabase from "../supabase/client";

export function useUserExercises() {
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);

  const getExercisesByPlanAndUser = async (plan_id, user_id) => {
    if (!plan_id || !user_id) {
      setError("Missing plan_id or user_id");
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("user_exercises")
      .select(`
        *,
        exercise_library (
          name,
          gif_url
        )
      `)
      .eq("plan_id", plan_id)

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setExercises(data);
  };

  return { exercises, loading, error, getExercisesByPlanAndUser };
}