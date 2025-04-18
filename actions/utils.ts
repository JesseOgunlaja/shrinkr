"use server";

import { getUser } from "@/lib/redis";
import { currentUser } from "@clerk/nextjs/server";

export async function checkUser() {
  const { id } = (await currentUser())!;
  const user = await getUser(id);

  return !!user;
}
