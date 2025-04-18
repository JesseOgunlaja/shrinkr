import { env } from "@/lib/env";
import { getUser, kv } from "@/lib/redis";
import { UserType } from "@/lib/types";
import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(request: NextRequest) {
  try {
    const payload = await validateRequest(request);

    const { id, email_addresses } = payload.data as UserJSON;
    if (payload.type === "user.created") {
      const email = email_addresses?.[0]?.email_address;

      await kv.main.json.set(id, "$", {
        email,
        id,
        plan: "Free",
        links: [],
      } satisfies UserType);
    } else if (payload.type === "user.deleted") {
      const user = await getUser(id);
      await Promise.all([
        kv.main.del(id),
        user.links.map((link) => kv.links.del(link.backhalf)),
      ]);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

async function validateRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = await headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}
