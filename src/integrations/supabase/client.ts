// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lyprxidhvodqqtzqumkp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5cHJ4aWRodm9kcXF0enF1bWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczODE3NDcsImV4cCI6MjA1Mjk1Nzc0N30.4plgSam4lWxxqXttYOizcAlZ9M12rejVmeK8cCmmL5E";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);