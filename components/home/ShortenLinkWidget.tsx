"use client";

import { getFormValues } from "@/lib/utils";
import { URLSchema } from "@/lib/zod";
import { FormEvent } from "react";
import { toast } from "sonner";

const ShortenLinkWidget = () => {
  function formSubmit(e: FormEvent<HTMLFormElement>) {
    const { destination } = getFormValues(e);
    const result = URLSchema.safeParse(destination);
    if (!result.success) {
      toast.error("Invalid URL");
      e.preventDefault();
    }
  }

  return (
    <section>
      <form onSubmit={formSubmit} action="/create-link">
        <p>Shorten your link now</p>
        <p>No credit card needed.</p>
        <label htmlFor="homepage-link-destination">Enter your link here:</label>
        <input
          autoComplete="off"
          id="homepage-link-destination"
          name="destination"
          type="text"
          placeholder="https://example.com/very-long-link"
        />

        <button type="submit">Get your link for free</button>
      </form>
    </section>
  );
};

export default ShortenLinkWidget;
