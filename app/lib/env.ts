import { z } from "zod";

// Server-only env variables (never import this file in client components)
export const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  // Supabase
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

  // Sentry (optional)
  SENTRY_DSN: z.string().optional(),

  // Runtime
  NEXT_RUNTIME: z.string().optional(),
});

const parsed = EnvSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  SENTRY_DSN: process.env.SENTRY_DSN,
  NEXT_RUNTIME: process.env.NEXT_RUNTIME,
});

if (!parsed.success) {
  // Fail fast on missing configuration in non-test environments
  // eslint-disable-next-line no-console
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables. Check your .env configuration.");
}

export const env = parsed.data;
