import { useState, useEffect } from "react";
import useExercises from "../../utils/useLocalExercises";
import ExerciseCard from "../app/ExerciseCard";
import AddExerciseDrawer from "../app/AddExerciseDrawer";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";

export default function DebounceSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const { exercises, loading, error } = useExercises(
    debouncedTerm.length > 0 ? debouncedTerm : null
  );
  const [displayExercises, setDisplayExercises] = useState([]);

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = (exercise) => {
    setSelectedExercise(exercise);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedExercise(null);
  };

  // Paginazione
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExercises = displayExercises.slice(startIndex, endIndex);
  const totalPages = Math.ceil(displayExercises.length / itemsPerPage);

  useEffect(() => {
    if (loading) setDisplayExercises([]);
    else if (!debouncedTerm || debouncedTerm.trim() === "") {
      setDisplayExercises([]);
    } else {
      setDisplayExercises(exercises || []);
    }
    setCurrentPage(1);
  }, [loading, exercises, debouncedTerm]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <TextField
        fullWidth
        type="search"
        label="Cerca esercizi..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />

      {loading && <Typography>Caricamento...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {debouncedTerm && !loading && displayExercises.length === 0 && (
        <Typography>Nessun risultato trovato.</Typography>
      )}

      <Stack spacing={2}>
        {paginatedExercises.map((ex) => (
          <ExerciseCard key={ex.id} exercise={ex} onAdd={openDrawer} />
        ))}
      </Stack>

      {totalPages > 1 && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <Button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            variant="contained"
          >
            Indietro
          </Button>
          <Typography>
            Pagina {currentPage} di {totalPages}
          </Typography>
          <Button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="contained"
          >
            Avanti
          </Button>
        </Stack>
      )}

      <AddExerciseDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        exercise={selectedExercise}
      />
    </Container>
  );
}
