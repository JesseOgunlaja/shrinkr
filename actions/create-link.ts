"use server";

import { getUser, kv } from "@/lib/redis";
import { generateRandomString } from "@/lib/utils";
import { backhalfSchema, URLSchema } from "@/lib/zod";
import { currentUser } from "@clerk/nextjs/server";

export async function createLink(
  title: string,
  destination: string,
  shortLink: string
) {
  try {
    const user = await getUser((await currentUser())?.id);
    const backhalf =
      user.plan === "Free"
        ? generateRandomString()
        : shortLink || generateRandomString();

    if (await kv.links.exists(backhalf)) {
      return {
        ok: false,
        message: "A link with this backhalf already exists",
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

    await Promise.all([
      kv.main.json.set(
        user.id,
        "$.links",
        JSON.stringify([
          ...user.links,
          {
            backhalf,
            title,
            destination,
          },
        ])
      ),
      kv.links.set(backhalf, destination),
    ]);

    return {
      ok: true,
      message: "Successfully created link",
      backhalf,
    };
  } catch {
    return {
      ok: false,
      message: "An unexpected error occurred. Please try again",
    };
  }
}
