import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";

export default function ExerciseCard({ exercise, onAdd }) {
  return (
    <Flex mb={4} align="center" gap={3}>
      <Image
        src={exercise.gif_url}
        alt={exercise.name}
        loading="lazy"
        boxSize="80px"
        objectFit="contain"
        borderRadius="md"
      />
      <Box flex="1">
        <Text fontWeight="bold">{exercise.name}</Text>
        <Text fontSize="sm" color="gray.600">
          {exercise.category}
        </Text>
      </Box>
      <Button onClick={() => onAdd(exercise)} colorScheme="blue">
        Aggiungi
      </Button>
    </Flex>
  );
}
