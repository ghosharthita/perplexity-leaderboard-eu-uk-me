import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Log the request headers for debugging
    console.log('Request headers:', Object.fromEntries(req.headers.entries()));

    // Get the request body
    const body = await req.json()
    console.log('Received webhook data:', body)

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // First, store the raw webhook data
    const { data: webhookData, error: webhookError } = await supabaseClient
      .from('webhook_entries')
      .insert([{ data: body }])
      .select()

    if (webhookError) {
      console.error('Error storing webhook data:', webhookError)
      throw webhookError
    }

    // Insert data into leaderboard_data_1738627088110
    if (Array.isArray(body)) {
      for (const record of body) {
        const { error: leaderboardError } = await supabaseClient
          .from('leaderboard_data_1738627088110')
          .insert({
            "Strategist Region": record["Strategist Region"],
            "Country": record["Country"],
            "US State": record["US State"],
            "School Name": record["School Name"],
            "Email Domain": record["Email Domain"],
            "Activations (BTS 2025 Spring)": record["Activations (BTS 2025 Spring)"],
            "Queries (from BTS 2025 Spring Registrations)": record["Queries (from BTS 2025 Spring Registrations)"],
            "Queries": record["Queries"]
          })

        if (leaderboardError) {
          console.error('Error inserting into leaderboard:', leaderboardError)
          throw leaderboardError
        }
      }
    }

    // Generate table name based on timestamp to ensure uniqueness
    const timestamp = Date.now()
    const tableName = `perplexity_leaderboard_${timestamp}`

    // Extract column names and types from the first entry
    // Assuming body is an array of objects
    if (!Array.isArray(body) || body.length === 0) {
      throw new Error('Expected an array of data objects')
    }

    const firstEntry = body[0]
    const columns = Object.entries(firstEntry).map(([key, value]) => {
      let columnType = 'text'
      if (typeof value === 'number') columnType = 'numeric'
      else if (typeof value === 'boolean') columnType = 'boolean'
      // Escape column names that might contain spaces or special characters
      const escapedKey = `"${key.replace(/"/g, '""')}"`
      return `${escapedKey} ${columnType}`
    })

    // Create the dynamic table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        ${columns.join(',\n        ')},
        created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
      );
    `

    console.log('Creating table with SQL:', createTableSQL)

    // Use the database function to create the table
    const { error: createTableError } = await supabaseClient
      .rpc('create_dynamic_table', {
        sql_command: createTableSQL
      })

    if (createTableError) {
      console.error('Error creating table:', createTableError)
      throw createTableError
    }

    // Insert all records from the array
    for (const record of body) {
      const columnNames = Object.keys(record).map(k => `"${k.replace(/"/g, '""')}"`)
      const values = Object.values(record).map(v => 
        typeof v === 'string' ? `'${v.replace(/'/g, "''")}'` : v
      )

      const insertSQL = `
        INSERT INTO ${tableName} (${columnNames.join(', ')})
        VALUES (${values.join(', ')});
      `

      console.log('Inserting data with SQL:', insertSQL)

      const { error: insertError } = await supabaseClient
        .rpc('create_dynamic_table', {
          sql_command: insertSQL
        })

      if (insertError) {
        console.error('Error inserting data:', insertError)
        throw insertError
      }
    }

    console.log('Successfully created table and stored data')

    return new Response(
      JSON.stringify({ success: true, table: tableName }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 400
      }
    )
  }
})