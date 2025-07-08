import { useAuth } from "../context/AuthContext";
import supabase from "../supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/app/Login";
import SignUp from "../components/app/SignUp"
import { Box, Container, Typography, Tabs, Tab } from "@mui/material";
import PropTypes from 'prop-types';


export default function SignInPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);


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


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
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
            <Container maxWidth="sm" sx={{ pb: 2 }}>
                <p style={{ textAlign: 'center' }}>
                    <img src="logo.png" width={'80px'} />
                </p>
                <br />
                <Typography variant="h1" component="h2" sx={{ fontSize: '30px', letterSpacing: '-1px', textAlign: 'center' }}>
                    <b>Benvenuto su XWorkout</b>
                </Typography>
                <p style={{ textAlign: 'center' }}>Effettua il login con i tuoi dati oppure registrati.</p>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                            <Tab label="Accedi" {...a11yProps(0)} />
                            <Tab label="Registrati" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Login />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <SignUp />
                    </CustomTabPanel>
                </Box>
            </Container>
        </Box>
    );
}