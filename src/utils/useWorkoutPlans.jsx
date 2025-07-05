import { useState } from "react";
import supabase from "../supabase/client";

export function useWorkoutPlans() {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);

  const getWorkoutPlans = async (user_id) => {
    if (!user_id) {
      setError("User not logged in");
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("workout_plans")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setPlans(data);
  };
  return { plans, loading, error, getWorkoutPlans };
}