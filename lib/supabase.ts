import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jgqcyrkqqtinnxesiamy.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpncWN5cmtxcXRpbm54ZXNpYW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTM2MTcsImV4cCI6MjA4NzY4OTYxN30.3kqKbT45_m2XDEayblJf5XQ6qQGpGgvqFomwkxaw8n4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
