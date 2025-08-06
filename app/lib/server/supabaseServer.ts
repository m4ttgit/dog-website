import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env } from "../env";

// Server-side Supabase client using service role key.
// WARNING: Do not import this file in any client component.
export const supabaseServer = (() => {
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        "X-Client-Info": "dog-website/server",
      },
    },
  });
  return supabase;
})();
