// src/components/WorkoutDetails/WorkoutDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../supabase/client";
import { useUserExercises } from "../../utils/useUserExercises";
import { useAuth } from "../../context/AuthContext";

import { Typography, Card, CardContent } from "@mui/material";

import DebounceSearch from "./DebounceSearch";
import ExerciseList from "./ExerciseList";

export default function WorkoutDetails() {
    const { id: planId } = useParams();
    const { user } = useAuth();
    const { exercises, loading, error, getExercisesByPlanAndUser } =
        useUserExercises();

    const [items, setItems] = useState([]);
    const [planName, setPlanName] = useState("");

    useEffect(() => {
        if (user?.id && planId) {
            getExercisesByPlanAndUser(planId, user.id);
        }
    }, [planId, user]);

    useEffect(() => {
        async function fetchPlanName() {
            if (!planId) return;
            const { data, error } = await supabase
                .from("workout_plans")
                .select("title")
                .eq("id", planId)
                .single();

            if (error) {
                console.error("Errore fetch nome piano:", error);
                return;
            }

            setPlanName(data?.title || "");
        }

        fetchPlanName();
    }, [planId]);

    useEffect(() => {
        if (Array.isArray(exercises)) {
            setItems(
                [...exercises].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
            );
        }
    }, [exercises]);

    const handleFieldChange = async (id, field, value, save = false) => {
        const newList = items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    [field]: field === "display_name" ? value : parseInt(value) || 0,
                };
            }
            return item;
        });
        setItems(newList);

        if (save) {
            if (field === "weight") {
                // Aggiorna il weight di TUTTI gli esercizi con lo stesso exercise_id (in tutti i piani)
                const exerciseId = items.find((i) => i.id === id)?.exercise_id;
                if (!exerciseId) return;

                const { error } = await supabase
                    .from("user_exercises")
                    .update({ weight: parseInt(value) || 0 })
                    .eq("exercise_id", exerciseId);

                if (error) {
                    alert("Errore aggiornando peso in tutti i piani: " + error.message);
                    return;
                }

                // Aggiorna localmente anche gli altri elementi per mantenere sync UI
                setItems((oldItems) =>
                    oldItems.map((ex) =>
                        ex.exercise_id === exerciseId
                            ? { ...ex, weight: parseInt(value) || 0 }
                            : ex
                    )
                );
            } else {
                // Aggiorna singolo campo normalmente
                await supabase
                    .from("user_exercises")
                    .update({
                        [field]: field === "display_name" ? value : parseInt(value) || 0,
                    })
                    .eq("id", id);
            }


            if (field === "display_name") {
                // Aggiorna il weight di TUTTI gli esercizi con lo stesso exercise_id (in tutti i piani)
                const exerciseId = items.find((i) => i.id === id)?.exercise_id;
                if (!exerciseId) return;

                const { error } = await supabase
                    .from("user_exercises")
                    .update({ display_name: value || 0 })
                    .eq("exercise_id", exerciseId);

                if (error) {
                    alert("Errore aggiornando nome in tutti i piani: " + error.message);
                    return;
                }

                // Aggiorna localmente anche gli altri elementi per mantenere sync UI
                setItems((oldItems) =>
                    oldItems.map((ex) =>
                        ex.exercise_id === exerciseId
                            ? { ...ex, display_name: value || 0 }
                            : ex
                    )
                );
            } else {
                // Aggiorna singolo campo normalmente
                await supabase
                    .from("user_exercises")
                    .update({
                        [field]: field === "display_name" ? value : parseInt(value) || 0,
                    })
                    .eq("id", id);
            }

        }
    };

    const handleDelete = async (id) => {
        if (
            !window.confirm("Sei sicuro di voler eliminare questo esercizio dal piano?")
        )
            return;
        const { error } = await supabase.from("user_exercises").delete().eq("id", id);
        if (error) {
            alert("Errore eliminando esercizio: " + error.message);
            return;
        }
        setItems((old) => old.filter((item) => item.id !== id));
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <DebounceSearch />
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Dettaglio Workout Plan: {planName || "Caricamento..."}
                    </Typography>

                    <ExerciseList
                        items={items}
                        setItems={setItems}
                        onChange={handleFieldChange}
                        onDelete={handleDelete}
                    />
                </CardContent>
            </Card>
        </>
    );
}
