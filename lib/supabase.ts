import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// All tables are public read-only reference data (RLS: anyone can select),
// so the same anon key is safe to use on both the server and the client —
// this same client also backs the Chrome extension's live filter queries.
export const supabase = createClient(url, anonKey);
