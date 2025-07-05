import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,         // ✅ Sessione persistente tra refresh/schede
    autoRefreshToken: true,       // ✅ Rinnova automaticamente il token
    detectSessionInUrl: true      // ✅ Utile per OAuth o magic link
  }
});

export default supabase;
