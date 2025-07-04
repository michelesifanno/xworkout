// src/utils/useAddExerciseToPlan.jsx
import { useState } from "react";
import supabase from "../supabase/client";

export default function useAddExerciseToPlan() {
  const [loading, setLoading] = useState(false);

  const addExercise = async ({ planId, exerciseId, reps, sets, weight, unit }) => {
    setLoading(true);

    const { error } = await supabase.from("user_exercises").insert([
      {
        plan_id: planId,
        exercise_id: exerciseId,
        reps: Number(reps),
        sets: Number(sets),
        weight: Number(weight),
        weight_unit: unit,
        notes: "",
      },
    ]);

    setLoading(false);

    if (error) throw error;
    return true;
  };

  return { addExercise, loading };
}
