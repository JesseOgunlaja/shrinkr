import { FormEvent } from "react";

export function generateRandomString() {
  const length = 4;
  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export function getFormValues(e: FormEvent<HTMLFormElement>) {
  const formData = new FormData(e.currentTarget);
  const formValues = Object.fromEntries(formData.entries());
  return formValues as Record<string, string>;
}
