import { useState } from "react";
import supabase from "../../supabase/client";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, TextField, Button, Divider } from '@mui/material';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [display_name, setDisplay_name] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name,
          phone,
        },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Registrazione completata");
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSignup}>
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
        name="display name"
        label="Nickname"
        type="text"
        id="display name"
        onChange={(e) => setDisplay_name(e.target.value)}
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
        Registrati
      </Button>
    </form>
  );
}
