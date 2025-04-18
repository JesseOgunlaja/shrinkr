"use client";

import { Copy, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PropsType {
  linkURL: string;
}

const CreatedLinkDialog = ({ linkURL }: PropsType) => {
  const router = useRouter();
  const [copyState, setCopyState] = useState(false);

  function buttonClick() {
    navigator.clipboard.writeText(linkURL);
    setCopyState(true);
    setTimeout(() => {
      setCopyState(false);
    }, 1500);
  }

  return (
    <dialog open={!!linkURL}>
      <div>
        <p>
          Your link is ready! <X onClick={() => router.push("/dashboard")} />
        </p>
        <p>Copy the link below to start sharing your link.</p>
        <p>
          {linkURL}{" "}
          <button onClick={buttonClick} type="button">
            {copyState ? "Copied!" : "Copy link"}
            <Copy />
          </button>
        </p>
      </div>
    </dialog>
  );
};

export default CreatedLinkDialog;
