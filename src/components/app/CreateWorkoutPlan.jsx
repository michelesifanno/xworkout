import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCreateWorkoutPlan } from "../../utils/useCreateWorkoutPlan";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  Divider
} from "@mui/material";


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
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2, // spazio tra input e bottone
          alignItems: "center",
        }}
      >
        <TextField
          label="Crea nuovo plan"
          size="small"
          fullWidth
          type="text"
          placeholder="Titolo workout plan"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ flex: 1 }} // prende tutto lo spazio disponibile
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreatePlan}
          disabled={loading}
        >
          {loading ? "Salvataggio..." : "Salva"}
        </Button>
      </Box>

    </>
  );
}
