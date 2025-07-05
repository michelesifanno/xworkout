import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DebounceSearch from '../components/app/DebounceSearch';

export default function AppNavbar() {
    return (
        <Box
            sx={{
                width: "100vw",
                backgroundColor: "#0000",
            }}
        >
            <AppBar position="fixed">
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottom: '1px solid #1c1c1e',
                        backgroundColor: "#000",
                    }}>
                    <img src="/logo.png" width={'40px'} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}