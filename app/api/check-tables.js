import { supabase } from '@/app/lib/supabase';

export async function GET() {
  try {
    // Query PostgreSQL system catalog to get table names
    // Try a simple query to check if table exists
    const { data, error } = await supabase
      .from('dogbreed')
      .select('*')
      .limit(1);
    
    if (error) {
      throw error;
    }

    const tables = data.map(row => row.tablename);
    return new Response(JSON.stringify({ tables }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message,
      hint: 'Ensure Supabase project is running and you have proper permissions'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
