/**
 * Supabase Client
 * Initializes and exports the Supabase client instance.
 * Used across the app for database operations — prayer requests, contact forms.
 * Reads credentials from environment variables — never hardcoded.
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)