import React, { useState, useEffect, useRef } from "react";
import {
  Drawer,
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../context/AuthContext";
import supabase from "../../supabase/client";
import useAddExerciseToPlan from "../../utils/useAddExerciseToPlan";

export default function AddExerciseDrawer({ isOpen, onClose, exercise }) {
  const { user } = useAuth();
  const firstFieldRef = useRef(null);

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");

  const { addExercise, loading } = useAddExerciseToPlan();

  useEffect(() => {
    if (!user) return;
    const fetchPlans = async () => {
      const { data } = await supabase
        .from("workout_plans")
        .select("*")
        .eq("user_id", user.id);
      if (data) setPlans(data);
    };
    fetchPlans();
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      setSelectedPlan("");
      setReps("");
      setSets("");
      setWeight("");
      setUnit("kg");
      setTimeout(() => {
        firstFieldRef.current?.focus();
      }, 100);
    }
  }, [isOpen, exercise]);

const handleSave = async () => {
  console.log("handleSave called", { selectedPlan, exercise });
    console.log("selectedPlan:", selectedPlan, "exercise:", exercise);
    console.log("exercise.id:", exercise?.id);
console.log("exercise._id:", exercise?._id);
console.log("exercise.exercise_id:", exercise?.exercise_id);


  if (!selectedPlan || !exercise?.id) {
    alert("Seleziona un piano e assicurati che l'esercizio sia valido.");
    return;
  }
  try {
    await addExercise({
      planId: selectedPlan,
      exerciseId: exercise.id,
      reps,
      sets,
      weight,
      unit,
    });
    onClose();
  } catch (error) {
    alert("Errore: " + error.message);
  }
};


  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 350, p: 3, position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
          aria-label="close drawer"
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom fontWeight="bold">
          Aggiungi esercizio: {exercise?.name}
        </Typography>

        <Stack spacing={2}>
          <Select
            displayEmpty
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            fullWidth
            size="small"
            inputProps={{ "aria-label": "Seleziona workout plan" }}
          >
            <MenuItem value="">
              <em>Seleziona workout plan</em>
            </MenuItem>
            {plans.map((plan) => (
              <MenuItem key={plan.id} value={plan.id}>
                {plan.title}
              </MenuItem>
            ))}
          </Select>

          <TextField
            label="Reps"
            type="number"
            inputRef={firstFieldRef}
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            size="small"
            fullWidth
          />
          <TextField
            label="Sets"
            type="number"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            size="small"
            fullWidth
          />
          <TextField
            label="Peso"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            size="small"
            fullWidth
          />
          <Select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            size="small"
            fullWidth
          >
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="lbs">lbs</MenuItem>
          </Select>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
            <Button variant="outlined" onClick={onClose}>
              Annulla
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Caricamento..." : "Aggiungi"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
}
