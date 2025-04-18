import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
  },
  server: {
    BASE_URL: z.string(),
    REDIS_TOKEN: z.string(),
    REDIS_URL: z.string().url(),
    STRIPE_SECRET_KEY: z.string(),
    REDIS_LINKS_TOKEN: z.string(),
    CLERK_WEBHOOK_SECRET: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    REDIS_LINKS_URL: z.string().url(),
  },
  runtimeEnv: {
    BASE_URL: process.env.BASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_TOKEN: process.env.REDIS_TOKEN,
    REDIS_LINKS_URL: process.env.REDIS_LINKS_URL,
    REDIS_LINKS_TOKEN: process.env.REDIS_LINKS_TOKEN,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  },
});
