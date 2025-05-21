// src/lib/supabase/client.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: "sb:token",
    storage: {
      getItem: (key) => {
        if (typeof window === "undefined") return null;
        return document.cookie.split("; ").reduce((acc, cookie) => {
          const [name, value] = cookie.split("=");
          if (name === key) return decodeURIComponent(value);
          return acc;
        }, null);
      },
      setItem: (key, value) => {
        if (typeof window === "undefined") return;
        document.cookie = `${key}=${encodeURIComponent(
          value
        )}; path=/; max-age=2592000`; // 30 dias
      },
      removeItem: (key) => {
        if (typeof window === "undefined") return;
        document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      },
    },
  },
});
