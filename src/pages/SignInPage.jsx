import { useAuth } from "../context/AuthContext";
import supabase from "../supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/app/Login";
import { Box, Container, Typography } from "@mui/material";

export default function SignInPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/"); // Redirect automatico se già loggato
        }
    }, [user]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) alert("Errore nel logout");
        else navigate("/signin");
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container maxWidth="sm" sx={{pb:2}}>
                <p style={{ textAlign: 'center' }}>
                    <img src="logo.png" width={'80px'} />
                </p>
                <br />
                <Typography variant="h1" component="h2" sx={{ fontSize: '30px', letterSpacing: '-1px', textAlign: 'center' }}>
                    <b>Benvenuto su XWorkout</b>
                </Typography>
                <p style={{ textAlign: 'center' }}>Effettua il login con i tuoi dati oppure registrati.</p>
                <Login />
            </Container>
        </Box>
    );
}
