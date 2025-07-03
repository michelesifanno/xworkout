import { useState, useEffect } from "react";
import { Button, Flex, Text, Input, Box, Image } from "@chakra-ui/react";
import useExercises from "../../utils/useLocalExercises";

export default function DebounceSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const { exercises, loading, error } = useExercises(
    debouncedTerm.length > 0 ? debouncedTerm : null
  );

  const [displayExercises, setDisplayExercises] = useState([]);

  // Paginazione
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (loading) {
      setDisplayExercises([]);
    } else if (!debouncedTerm || debouncedTerm.trim() === "") {
      setDisplayExercises([]);  // svuota se la ricerca è vuota
    } else {
      setDisplayExercises(exercises || []);
    }
    // Resetta la pagina a 1 ogni volta che cambia la ricerca
    setCurrentPage(1);
  }, [loading, exercises, debouncedTerm]);



  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Calcola gli esercizi da mostrare in pagina
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExercises = displayExercises.slice(startIndex, endIndex);

  const totalPages = Math.ceil(displayExercises.length / itemsPerPage);

  return (
    <Box maxW="400px" mx="auto" p={5}>
      <Input
        type="search"
        placeholder="Cerca esercizi..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
        size="md"
      />

      {debouncedTerm === "" && <Text mb={4}>Inizia a digitare per cercare un esercizio</Text>}

      {loading && <Text mb={4}>Caricamento...</Text>}
      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}

      {debouncedTerm !== "" && !loading && displayExercises.length === 0 && (
        <Text mb={4}>Nessun risultato trovato.</Text>
      )}

      <Box>
        {debouncedTerm !== "" &&
          paginatedExercises.map((ex) => (
            <Flex key={ex.name} mb={4} align="center" gap={3}>
              <Image
                src={ex.gif_url}
                alt={ex.name}
                loading="lazy"
                boxSize="80px"
                objectFit="contain"
                borderRadius="md"
              />
              <Box>
                <Text fontWeight="bold">{ex.name}</Text>
                <Text fontSize="sm" color="gray.600">
                  {ex.category}
                </Text>
              </Box>
            </Flex>
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
    </Box>
  );
}
