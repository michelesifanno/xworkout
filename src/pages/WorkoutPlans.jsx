import { Typography, Card, CardContent, Container, Box } from "@mui/material";


import CreateWorkoutPlan from "../components/app/CreateWorkoutPlan";
import WorkoutPlansList from "../components/app/WorkoutPlansList";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import supabase from "../supabase/client";

export default function WorkoutPlans() {

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/signin"); // Redirect automatico se non loggato
        }
    }, [user]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) alert("Errore nel logout");
        else navigate("/signin"); // Torna al login dopo logout
    };

    if (!user) return <p>Caricamento...</p>;


    return (
        <>
            <Box sx={{ height: '120px' }} />
            <Container maxWidth="sm">
                <Typography variant="h1" component="h2" sx={{ fontSize: '30px', letterSpacing: '-1px', textAlign: 'center' }}>
                    <b>Workout Plans</b>
                </Typography>
                <br />
                <CreateWorkoutPlan />
                <WorkoutPlansList />
            </Container>
            <br />
            <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
                Logout
            </button>

        </>
    )
}