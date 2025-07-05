import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, useTheme } from '@mui/material';


import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';


export default function AppLayout() {


    const [value, setValue] = useState('dashboard');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };




    return (
        <>
                <Outlet />

                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
                    <BottomNavigation
                        sx={{ width: '100%' }}
                        value={value}
                        onChange={handleChange}
                    >
                        <BottomNavigationAction
                            label="Dashboard"
                            value="dashboard"
                            icon={<HomeOutlinedIcon />}
                            component={Link}
                            to="/"
                        />
                        <BottomNavigationAction
                            label="Workout"
                            value="workout"
                            icon={<FitnessCenterOutlinedIcon />}
                            component={Link}
                            to="/workout"
                        />
                    </BottomNavigation>
                </Paper>
        </>
    );
}
