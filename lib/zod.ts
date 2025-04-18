import { z } from "zod";

export const URLSchema = z.string().url();
export const backhalfSchema = z.string().regex(/^[a-zA-Z0-9_-]*$/, {
  message: "Only letters, numbers, hyphens, and underscores are allowed",
});
