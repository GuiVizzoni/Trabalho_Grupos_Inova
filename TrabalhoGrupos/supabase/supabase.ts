import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://bqvlrsbhboayevawaahg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxdmxyc2JoYm9heWV2YXdhYWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwOTUxNTQsImV4cCI6MjA0MjY3MTE1NH0.ivrX7tVKGRAiyyKgpjRgJDbj8P3WgR-uNUksepRDXNo'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)