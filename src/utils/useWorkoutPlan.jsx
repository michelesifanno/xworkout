import { useState, useEffect } from "react";
import supabase from "../supabase/client";

export function useWorkoutPlan(planId) {
  const [planName, setPlanName] = useState("");
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [errorPlan, setErrorPlan] = useState(null);

  useEffect(() => {
    if (!planId) return;

    async function fetchPlanName() {
      setLoadingPlan(true);
      const { data, error } = await supabase
        .from("workout_plans")
        .select("title")
        .eq("id", planId)
        .single();

      if (error) {
        setErrorPlan(error);
      } else {
        setPlanName(data?.title || "");
      }
      setLoadingPlan(false);
    }
    fetchPlanName();
  }, [planId]);

  return { planName, loadingPlan, errorPlan };
}
