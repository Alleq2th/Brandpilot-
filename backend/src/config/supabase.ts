import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!supabaseUrl) {
  throw new Error("❌ SUPABASE_URL is missing in .env");
}

if (!supabaseAnonKey) {
  throw new Error("❌ SUPABASE_ANON_KEY is missing in .env");
}

if (!supabaseServiceKey) {
  throw new Error("❌ SUPABASE_SERVICE_ROLE_KEY is missing in .env");
}

// Client for authenticated user actions
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Admin client for backend-only operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

console.log("✅ Supabase connected successfully");
