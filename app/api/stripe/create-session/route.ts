import { env } from "@/lib/env";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function GET() {
  try {
    const { id } = (await currentUser())!;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1REwNxGGuMCqF6U1r9oU4Npc",
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: { id },
      success_url: `${env.BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.BASE_URL}/update-plan`,
    });

    return NextResponse.redirect(String(session.url), 303);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
