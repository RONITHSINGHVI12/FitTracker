// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pawzgophseyoacvrcrit.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhd3pnb3Boc2V5b2FjdnJjcml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2OTY3ODMsImV4cCI6MjA2NzI3Mjc4M30.T34CsYFGVXcjEShnX8zJDSqOmN2ZlcQ2VQb0PSm8-8U";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});