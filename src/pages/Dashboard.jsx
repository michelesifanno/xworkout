import { useAuth } from "../context/AuthContext";
import supabase from "../supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin"); // Redirect automatico se non loggato
    }
  }, [user]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert("Errore nel logout");
    else navigate("/login"); // Torna al login dopo logout
  };

  if (!user) return <p>Caricamento...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dashboard</h2>
      <p>Email: <strong>{user.email}</strong></p>
      <p>User ID: <code>{user.id}</code></p>

      <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
        Logout
      </button>
    </div>
  );
}