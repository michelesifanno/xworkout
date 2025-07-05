import { RouterProvider } from 'react-router-dom';
import router from "./routes/Routing";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import darkTheme from './theme/darkTheme';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
                <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}