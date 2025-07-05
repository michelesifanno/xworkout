import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, useTheme } from '@mui/material';
import { useAuth } from "../context/AuthContext";
import AppNavbar from './AppNavbar';



import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';


export default function AppLayout() {

    const { user } = useAuth();


    const [value, setValue] = useState('dashboard');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <>
            {user ?
                <AppNavbar />
                :
                <></>}

            <Outlet />

        </>
    );
}
