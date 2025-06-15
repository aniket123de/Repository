import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a fallback client or disable Supabase if env vars are missing
let supabase: any = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase environment variables not found. Running in offline mode.');
  // Create a mock client for development
  supabase = {
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: null }),
      upsert: () => ({ data: null, error: null, select: () => ({ single: () => ({ data: null, error: null }) }) })
    })
  };
}

export { supabase };

// Types for our database tables
export interface UserProfile {
  id?: number;
  name: string;
  email?: string;
  linkedin?: string;
  github?: string;
  expertise?: 'webdev' | 'appdev' | 'blockchain' | 'aiml';
  interests?: Record<number, number[]> | string[];
  interest_details?: Array<{
    question: string;
    selectedOptions: string[];
  }>;
  bio?: string;
  skills?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface SearchFilters {
  skills?: string[];
  interests?: string[];
  expertise?: 'webdev' | 'appdev' | 'blockchain' | 'aiml';
}
