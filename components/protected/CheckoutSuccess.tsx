"use client";

import { useEffect } from "react";
import { toast } from "sonner";

interface PropsType {
  success: boolean;
}

const CheckoutSuccess = ({ success }: PropsType) => {
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("session_id");
    window.history.replaceState({}, document.title, url.toString());

    if (success) toast.success("Successfully moved to the premium plan");
  }, []);
  return null;
};

export default CheckoutSuccess;
