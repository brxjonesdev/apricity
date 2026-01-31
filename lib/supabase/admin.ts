// lib/supabase/admin.ts
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // Supabase project URL
  process.env.SUPABASE_SECRET_KEY!, // your secret service role key
);
