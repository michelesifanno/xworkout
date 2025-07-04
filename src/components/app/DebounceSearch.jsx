import { useState, useEffect } from "react";
import { Input, Box, Text, Flex, Button } from "@chakra-ui/react";
import useExercises from "../../utils/useLocalExercises";
import ExerciseCard from "../ui/ExerciseCard";
import AddExerciseDrawer from "../ui/AddExerciseDrawer";


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
    <Box maxW="400px" mx="auto" p={5}>
      <Input
        type="search"
        placeholder="Cerca esercizi..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />

      {loading && <Text>Caricamento...</Text>}
      {error && <Text color="red.500">{error}</Text>}
      {debouncedTerm && !loading && displayExercises.length === 0 && (
        <Text>Nessun risultato trovato.</Text>
      )}

      <Box>
        {paginatedExercises.map((ex) => (
          <ExerciseCard key={ex.id} exercise={ex} onAdd={openDrawer} />
        ))}
      </Box>

      {totalPages > 1 && (
        <Flex justify="space-between" align="center" mt={6}>
          <Button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            colorScheme="teal"
          >
            Indietro
          </Button>
          <Text>
            Pagina {currentPage} di {totalPages}
          </Text>
          <Button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            colorScheme="teal"
          >
            Avanti
          </Button>
        </Flex>
      )}

      <AddExerciseDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        exercise={selectedExercise}
      />
    </Box>
  );
}
