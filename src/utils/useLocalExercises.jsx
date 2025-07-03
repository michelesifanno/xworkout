import { useEffect, useState } from "react";
import supabase from "../supabase/client";

export default function useExercises(name) {
    const [exercises, setExercises] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchExercises() {

            if (!name || name.trim() === "") {
                // Se name è vuoto o null, resetta stati e non fare fetch
                setExercises([]);
                setLoading(false);
                setError(null);
                return;
            }

            setExercises([]);
            setLoading(true);
            setError(null);


            try {
                let query = supabase
                    .from("exercise_library")
                    .select(
                        "name, target, equipment, gif_url, body_part, secondary_muscles, instructions, description, difficulty, category"
                    );

                if (name && name.trim() !== "") {
                    // Cerca esercizi che contengono la stringa name (case insensitive)
                    query = query.ilike("name", `%${name}%`);
                }

                const { data: dbRecords, error: dbError } = await query;

                if (dbError) throw dbError;

                setExercises(dbRecords);
            } catch (err) {
                console.error("Errore durante il fetch:", err);
                setError("Impossibile caricare i dati");
            } finally {
                setLoading(false);
            }
        }

        fetchExercises();
    }, [name]);

    return { exercises, loading, error };
}