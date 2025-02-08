import { createClient } from "https://esm.sh/@supabase/supabase-js";

// 🔹 Replace these with your actual Supabase credentials
const SUPABASE_URL = "https://swzikgptrgswafbaslvw.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3emlrZ3B0cmdzd2FmYmFzbHZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwMzQ0NDIsImV4cCI6MjA1NDYxMDQ0Mn0.0mkB2Q1IWuY8OC40AeZ2aYebFIWH2E2LFQpsgKUo6M4"; 

// ✅ Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("✅ Supabase Initialized");
