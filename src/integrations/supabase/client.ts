// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ydofttirhgctnefwcqtf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkb2Z0dGlyaGdjdG5lZndjcXRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxOTYyMzIsImV4cCI6MjA1NTc3MjIzMn0.VMMgzC0IkY0BHG2GBnU2QhPMl3iWdQsMNPWlxpj4OG0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);