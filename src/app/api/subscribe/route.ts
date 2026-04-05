import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/subscribe
 * Body: { email: string }
 *
 * In production: connect to your email provider (Resend, Mailchimp, etc.)
 * For now: validates email and returns success.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email: string = (body.email ?? '').trim().toLowerCase()

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Neplatná e-mailová adresa.' }, { status: 400 })
    }

    // TODO: persist to DB / send to email provider
    // Example with Resend:
    //   await resend.contacts.create({ email, audienceId: process.env.RESEND_AUDIENCE_ID })
    //
    // Example with Mailchimp:
    //   await mailchimp.lists.addListMember(listId, { email_address: email, status: 'subscribed' })

    console.log('[subscribe] New subscriber:', email)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Interní chyba serveru.' }, { status: 500 })
  }
}
