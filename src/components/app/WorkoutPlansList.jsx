import React, { useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Container,
    Grid,
    Button,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useWorkoutPlans } from "../../utils/useWorkoutPlans";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function WorkoutPlansList() {
    const { user } = useAuth();
    const { plans, loading, error, getWorkoutPlans } = useWorkoutPlans();

    useEffect(() => {
        if (user?.id) {
            getWorkoutPlans(user.id);
        }
    }, [user]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Container sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                {plans.map((plan) => (
                    <Grid item xs={12} sm={12} md={12} key={plan.id}>
                        <Link
                            to={`/workout/${plan.id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <Card elevation={0}
                                sx={{ height: "100%", cursor: "pointer", p: 2, bgcolor: "black" }}>
                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                    <FitnessCenterIcon color="primary" />
                                    <Typography variant="h6" color="text.primary">
                                        {plan.title}
                                    </Typography>
                                </Box>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
