import { Typography, Card, CardContent, Container, Box, Button } from "@mui/material";
import CreateWorkoutPlan from "../components/app/CreateWorkoutPlan";
import WorkoutPlansList from "../components/app/WorkoutPlansList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import supabase from "../supabase/client";

export default function WorkoutPlans() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/signin"); // Redirect automatico se non loggato
        } else {
            // Effettua una query per ottenere il display_name dell'utente
            const fetchDisplayName = async () => {
                const { data, error } = await supabase
                    .from('profiles') // Sostituisci con il nome della tua tabella se è diversa
                    .select('display_name')
                    .eq('id', user.id) // Usa l'ID dell'utente connesso
                    .single();

                if (error) {
                    console.error("Errore nel recupero del display_name:", error);
                } else {
                    setDisplayName(data.display_name);
                }
            };

            fetchDisplayName();
        }
    }, [user, navigate]);



    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) alert("Errore nel logout");
        else navigate("/signin"); // Torna al login dopo logout
    };

    if (!user) return <p>Caricamento...</p>;


    return (
        <>
            <Box sx={{ height: '120px' }} />
            <Container maxWidth="sm" >
                <Typography variant="h1" component="h2" sx={{ fontSize: '30px', letterSpacing: '-1px', textAlign: 'center' }}>
                    <b>Workout Plans</b>
                </Typography>
                <br />
                <CreateWorkoutPlan />
                <WorkoutPlansList />
                <Button
                    onClick={handleLogout}
                    sx={{ marginTop: "1rem", display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                    Logout
                </Button>
            </Container>
        </>
    )
}