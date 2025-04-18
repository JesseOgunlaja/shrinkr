import { Redis } from "@upstash/redis";
import { env } from "./env";
import { UserType } from "./types";

export const kv = {
  main: new Redis({
    url: env.REDIS_URL,
    token: env.REDIS_TOKEN,
  }),
  links: new Redis({
    url: env.REDIS_LINKS_URL,
    token: env.REDIS_LINKS_TOKEN,
  }),
};

export async function getUser(id: string | undefined) {
  return (await kv.main.json.get(String(id))) as UserType;
}
