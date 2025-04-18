"use server";

import { getUser, kv } from "@/lib/redis";
import { backhalfSchema, URLSchema } from "@/lib/zod";
import { currentUser } from "@clerk/nextjs/server";

export async function editLink(
  currentBackhalf: string,
  title: string,
  destination: string,
  shortLink: string
) {
  try {
    const user = await getUser((await currentUser())?.id);
    const backhalf =
      user.plan === "Free" ? currentBackhalf : shortLink || currentBackhalf;
    if (backhalf !== currentBackhalf && (await kv.links.get(backhalf))) {
      return {
        ok: false,
        message: "A link with that backhalf already exists",
      };
    }

    if (!title)
      return {
        ok: false,
        message: "Title required",
      };
    if (!URLSchema.safeParse(destination).success)
      return {
        ok: false,
        message: "Invalid destination URL",
      };
    if (!backhalfSchema.safeParse(backhalf).success)
      return {
        ok: false,
        message: "Invalid short link",
      };

    const linkIndex = user.links.findIndex(
      (link) => link.backhalf === currentBackhalf
    );
    if (linkIndex === -1) {
      return {
        ok: false,
        message: "Link not found",
      };
    }

    user.links[linkIndex] = {
      backhalf,
      title,
      destination,
    };

    await Promise.all([
      kv.main.json.set(user.id, "$.links", JSON.stringify(user.links)),
      kv.links.set(backhalf, destination),
    ]);

    return {
      ok: true,
      message: "Successfully edited link",
      backhalf,
    };
  } catch {
    return {
      ok: false,
      message: "An unexpected error occurred. Please try again",
    };
  }
}
