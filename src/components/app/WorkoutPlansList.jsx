import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Workout Plans
                </Typography>
                {plans.map((plan) => (
                    <Link
                        key={plan.id}
                        to={`/workout/${plan.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <Card sx={{ mb: 2, cursor: 'pointer' }}>
                            <CardContent>
                                <Typography variant="h6">{plan.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {plan.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </CardContent>
        </Card>
    );
}
