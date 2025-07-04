import { useState } from "react";
import supabase from "../supabase/client";

export function useCreateWorkoutPlan() {
  const [loading, setLoading] = useState(false);

  const createPlan = async (user_id, title) => {
    if (!title) throw new Error("Title is required");
    if (!user_id) throw new Error("User not logged in");

    setLoading(true);
    const { data, error } = await supabase.from("workout_plans").insert([
      { user_id, title, created_at: new Date().toISOString() },
    ]);
    setLoading(false);

    if (error) throw error;
    return data;
  };

  return { createPlan, loading };
}
