"use server";

import { getUser, kv } from "@/lib/redis";
import { currentUser } from "@clerk/nextjs/server";

export async function deleteLink(backhalf: string) {
  try {
    const user = await getUser((await currentUser())?.id);
    const linkIndex = user.links.findIndex(
      (link) => link.backhalf === backhalf
    );

    if (linkIndex === -1) {
      return {
        ok: false,
        message: "We couldn't find this link",
      };
    }

    user.links.splice(linkIndex, 1);

    await Promise.all([
      kv.main.json.set(user.id, "$.links", JSON.stringify(user.links)),
      kv.links.del(backhalf),
    ]);

    return {
      ok: true,
      message: "Successfully deleted link",
    };
  } catch {
    return {
      ok: false,
      message: "An unexpected error occurred. Please try again",
    };
  }
}
