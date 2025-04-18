import { env } from "@/lib/env";
import { kv } from "@/lib/redis";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);
const endpointSecret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status !== "paid") {
        return NextResponse.json(
          { error: "Payment not completed" },
          { status: 400 }
        );
      }

      await kv.main.json.set(
        session.metadata!.id,
        "$.plan",
        JSON.stringify("Premium")
      );
      break;
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
