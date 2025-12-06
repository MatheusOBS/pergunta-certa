import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
    apiVersion: '2022-11-15',
    httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

serve(async (req) => {
    const signature = req.headers.get('Stripe-Signature')

    if (!signature) {
        return new Response('No signature', { status: 400 })
    }

    try {
        const body = await req.text()
        const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

        let event
        try {
            event = await stripe.webhooks.constructEventAsync(
                body,
                signature,
                webhookSecret,
                undefined,
                cryptoProvider
            )
        } catch (err) {
            console.error(`⚠️  Webhook signature verification failed.`, err.message)
            return new Response(err.message, { status: 400 })
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object
            const customerEmail = session.customer_details?.email

            // Aqui você define quantos créditos dar baseado no produto
            // Exemplo: Se o valor for R$ 19,90 (1990 centavos), dá 10 créditos
            let creditsToAdd = 0
            if (session.amount_total === 1990) {
                creditsToAdd = 10
            } else if (session.amount_total === 4990) {
                creditsToAdd = 50 // Plano Pro
            }

            if (customerEmail && creditsToAdd > 0) {
                const supabase = createClient(
                    Deno.env.get('SUPABASE_URL') ?? '',
                    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
                )

                // Buscar usuário pelo email
                const { data: userData, error: userError } = await supabase
                    .from('profiles')
                    .select('id, credits')
                    .eq('email', customerEmail)
                    .single()

                if (userData) {
                    await supabase
                        .from('profiles')
                        .update({ credits: userData.credits + creditsToAdd })
                        .eq('id', userData.id)

                    console.log(`Adicionados ${creditsToAdd} créditos para ${customerEmail}`)
                }
            }
        }

        return new Response(JSON.stringify({ received: true }), {
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (err) {
        return new Response(err.message, { status: 400 })
    }
})
