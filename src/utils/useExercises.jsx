import { useEffect, useState } from "react";
import axios from "axios";
import supabase from "../supabase/client";

export default function useExercises(id) {
    const [exercises, setExercises] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function uploadGIFAndGetURL(gifUrl, id) {
        try {
            // Scarica GIF in formato buffer
            const response = await axios.get(gifUrl, { responseType: "arraybuffer" });
            const file = new Blob([response.data], { type: "image/gif" });

            const { data, error: uploadError } = await supabase.storage
                .from("exercise-gifs")
                .upload(`${id}.gif`, file, {
                    cacheControl: "3600",
                    upsert: true,
                });

            if (uploadError) {
                console.error(`Errore upload GIF ${id}:`, uploadError.message);
                return null;
            }

            const { data: publicUrlData } = supabase
                .storage
                .from("exercise-gifs")
                .getPublicUrl(`${id}.gif`);

            return publicUrlData.publicUrl;
        } catch (err) {
            console.error(`Errore download/upload GIF ${id}:`, err.message);
            return null;
        }
    }

    useEffect(() => {
        async function fetchExercises() {
            setLoading(true);
            setError(null);

            try {
                const url = `https://${import.meta.env.VITE_BASE_URL}/exercises?limit=9999999999999999&offset=0`;
                const response = await axios.get(url, {
                    headers: {
                        "x-rapidapi-host": import.meta.env.VITE_BASE_URL,
                        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
                    },
                });

                const apiExercises = response.data;

                if (!Array.isArray(apiExercises) || apiExercises.length === 0) {
                    throw new Error("Nessun dato ricevuto dall'API");
                }

                setExercises(apiExercises);

                // Carica GIF e inserisce nel DB
                for (const exercise of apiExercises) {
                    const gif_url = await uploadGIFAndGetURL(exercise.gifUrl, exercise.id);

                    const { error: upsertError } = await supabase
                        .from("exercise_library")
                        .upsert({
                            name: exercise.name,
                            target: exercise.target,
                            equipment: exercise.equipment,
                            gif_url,
                            body_part: exercise.bodyPart,
                            secondary_muscles: exercise.secondaryMuscles,
                            instructions: exercise.instructions,
                            description: exercise.description,
                            difficulty: exercise.difficulty,
                            category: exercise.category,
                        });

                    if (upsertError) {
                        console.error(`Errore upsert per ${exercise.name}:`, upsertError.message);
                    } else {
                        console.log(`✅ Inserito ${exercise.name}`);
                    }
                }
            } catch (err) {
                console.error("Errore durante il fetch:", err.message);
                setError("Impossibile caricare i dati");
            } finally {
                setLoading(false);
            }
        }

        fetchExercises();
    }, []);

    return { exercises, loading, error };
}
