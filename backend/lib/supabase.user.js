// lib/supabase.user.js
import { createClient } from '@supabase/supabase-js';

export const getUserSupabase = (token) =>
  createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  );
