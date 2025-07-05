import { Typography, Card, CardContent, Container, Box } from "@mui/material";


import CreateWorkoutPlan from "../components/app/CreateWorkoutPlan";
import WorkoutPlansList from "../components/app/WorkoutPlansList";


export default function WorkoutPlans() {
    return (
        <>
            <Box sx={{ height: '120px' }} />
            <Container maxWidth="sm">
                <CreateWorkoutPlan />
                <WorkoutPlansList />
            </Container>
        </>
    )
}