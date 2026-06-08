import { createClient } from '@supabase/supabase-js'

const supabaseUrl="https://ckxwrdybimwtkgewsbyk.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNreHdyZHliaW13dGtnZXdzYnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzExNDEsImV4cCI6MjA5NTkwNzE0MX0.hlClU3Rv-0uUu0Qc8v1lsKaIZEwSAw2ZX7LINeUw0RI"

export const supabase = createClient(supabaseUrl, supabaseKey)