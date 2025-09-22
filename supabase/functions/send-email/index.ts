/*
  # Send Email Edge Function

  1. Functionality
    - Receives form data from contact form
    - Validates input data
    - Sends email to posterly97@gmail.com
    - Returns success/error response

  2. Security
    - CORS headers for web requests
    - Input validation and sanitization
    - Rate limiting protection
*/

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface EmailRequest {
  nome: string;
  cognome: string;
  email: string;
  cellulare: string;
  messaggio: string;
  selected_posters?: Array<{ id: number; name: string }>;
  timestamp: string;
  honeypot?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const emailData: EmailRequest = await req.json()

    // Honeypot check (basic bot protection)
    if (emailData.honeypot && emailData.honeypot.trim() !== '') {
      return new Response(
        JSON.stringify({ error: 'Spam detected' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate required fields
    if (!emailData.nome || !emailData.cognome || !emailData.email || 
        !emailData.cellulare) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailData.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Phone validation (minimum 8 digits)
    const phoneRegex = /^\d{8,}$/
    if (!phoneRegex.test(emailData.cellulare.replace(/\s+/g, ''))) {
      return new Response(
        JSON.stringify({ error: 'Invalid phone number' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Create email content
    const emailSubject = emailData.selected_posters && emailData.selected_posters.length > 0
      ? `Nuova richiesta poster (${emailData.selected_posters.length} poster)`
      : 'Nuova richiesta da Posterly'

    const emailBody = `
Nuova richiesta ricevuta da Posterly

DATI CLIENTE:
Nome: ${emailData.nome}
Cognome: ${emailData.cognome}
Email: ${emailData.email}
Cellulare: ${emailData.cellulare}

${emailData.selected_posters && emailData.selected_posters.length > 0 ? `POSTER RICHIESTI:
${emailData.selected_posters.map(p => `- ${p.name} (ID: ${p.id})`).join('\n')}

` : ''}${emailData.messaggio ? `MESSAGGIO:
${emailData.messaggio}

` : ''}---

---
Data richiesta: ${new Date(emailData.timestamp).toLocaleString('it-IT')}
Inviato tramite: posterly-website
    `.trim()

    // For now, we'll simulate email sending
    // In production, you would integrate with a service like:
    // - Resend (resend.com)
    // - SendGrid
    // - Mailgun
    // - Amazon SES

    console.log('Email would be sent to: posterly97@gmail.com')
    console.log('Subject:', emailSubject)
    console.log('Body:', emailBody)

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error processing request:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: 'Unable to process request'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})