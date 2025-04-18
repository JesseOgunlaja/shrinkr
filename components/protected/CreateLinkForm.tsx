"use client";

import { createLink } from "@/actions/create-link";
import { promiseToast } from "@/lib/lib";
import { UserType } from "@/lib/types";
import { getFormValues } from "@/lib/utils";
import { backhalfSchema, URLSchema } from "@/lib/zod";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import CreatedLinkDialog from "./CreatedLinkDialog";

interface PropsType {
  destination: string;
  user: UserType;
}

const CreateLinkForm = ({ destination, user }: PropsType) => {
  const [linkURL, setLinkURL] = useState("");

  async function formSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { destination, title, backhalf } = getFormValues(e);

    if (!title) return toast.error("Title required");
    if (!URLSchema.safeParse(destination).success)
      return toast.error("Invalid destination URL");
    if (!backhalfSchema.safeParse(backhalf).success)
      return toast.error("Invalid short link");

    promiseToast(
      new Promise((resolve, reject) => {
        createLink(title, destination, backhalf).then((data) => {
          const { message, ok, backhalf } = data;
          if (ok) {
            setLinkURL(`shrinkr.link/${backhalf}`);
            resolve(message);
          } else reject(message);
        });
      })
    );
  }

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="create-link-title">Title</label>
      <input id="create-link-title" name="title" type="text" />
      <label htmlFor="create-link-destination">Destination</label>
      <input
        id="create-link-destination"
        autoComplete="off"
        autoCapitalize="off"
        type="text"
        name="destination"
        placeholder="https://example.com/very-long-link"
        defaultValue={destination}
      />
      <label htmlFor="create-short-link">Short link</label>
      <div>
        <input type="text" disabled value="shrinkr.link/" />
        <input
          disabled={user.plan === "Free"}
          id="create-short-link"
          autoComplete="off"
          name="backhalf"
          type="text"
          autoCapitalize="off"
        />
      </div>
      {user.plan === "Free" && (
        <p>Upgrade to a paid plan to use custom short links</p>
      )}

      <button type="submit">Create link</button>
      {linkURL && <CreatedLinkDialog linkURL={linkURL} />}
    </form>
  );
};

export default CreateLinkForm;
