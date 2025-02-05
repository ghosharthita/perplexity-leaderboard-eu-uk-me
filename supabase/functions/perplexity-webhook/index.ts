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
    console.log('Received webhook data:', JSON.stringify(body, null, 2))

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
      console.error('Error storing webhook data:', JSON.stringify(webhookError, null, 2))
      throw webhookError
    }

    // Generate table name based on timestamp
    const timestamp = Date.now()
    const tableName = `perplexity_leaderboard_${timestamp}`

    // Insert data into current leaderboard table
    if (Array.isArray(body)) {
      for (const record of body) {
        // Skip if Email Domain is empty
        if (!record["Email Domain"]) {
          console.log('Skipping record with empty Email Domain:', record)
          continue
        }

        const { error: leaderboardError } = await supabaseClient
          .from('perplexity_leaderboard_1738748367828')
          .upsert({
            "Strategist Region": record["Strategist Region"],
            "Country": record["Country"],
            "US State": record["US State"],
            "School Name": record["School Name"],
            "Email Domain": record["Email Domain"],
            "Activations (BTS 2025 Spring)": record["Activations (BTS 2025 Spring)"],
            "Queries (from BTS 2025 Spring Registrations)": record["Queries (from BTS 2025 Spring Registrations)"],
            "Queries": record["Queries"]
          }, {
            onConflict: "Email Domain"
          })

        if (leaderboardError) {
          console.error('Error upserting into leaderboard:', JSON.stringify(leaderboardError, null, 2))
          console.error('Failed record:', JSON.stringify(record, null, 2))
          throw leaderboardError
        }
      }
    } else {
      console.error('Received non-array payload:', JSON.stringify(body, null, 2))
      throw new Error('Expected an array of records')
    }

    console.log('Successfully processed webhook data')

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error processing webhook:', JSON.stringify(error, null, 2))
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error
      }),
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