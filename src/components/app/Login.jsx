import { useState } from "react";
import { Container, Grid, Typography, TextField, Button, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import supabase from "../../supabase/client";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Previene il submit tradizionale del form

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Indirizzo e-mail"
        name="email"
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        size="large"
      >
        Login
      </Button>
    </form>
  );
}
