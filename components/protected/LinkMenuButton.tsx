"use client";

import { LinkType } from "@/lib/types";
import styles from "@/styles/protected/dashboard.module.css";
import { Check, Copy, Pen, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteLinkDialog from "./DeleteLinkDialog";

interface PropsType {
  link: LinkType;
}

const LinkMenuButton = ({ link }: PropsType) => {
  const { title, backhalf, destination } = link;
  const [copyState, setCopyState] = useState(false);
  const [deleteDialogState, setDeleteDialogState] = useState(false);

  function copyButtonClick() {
    navigator.clipboard.writeText(`https://shrinkr.link/${backhalf}`);
    setCopyState(true);

    setTimeout(() => {
      setCopyState(false);
    }, 1500);
  }

  return (
    <div className={styles.link}>
      <div>
        {title}
        <div>
          {copyState ? (
            <Check onClick={copyButtonClick} />
          ) : (
            <Copy onClick={copyButtonClick} />
          )}

          <Link href={`/edit-link/${backhalf}`}>
            <Pen />
          </Link>

          <Trash onClick={() => setDeleteDialogState(true)} />

          <DeleteLinkDialog
            active={deleteDialogState}
            setActive={setDeleteDialogState}
            link={link}
          />
        </div>
      </div>
      <Link href={`https://shrinkr.link/${backhalf}`}>
        shrinkr.link/{backhalf}
      </Link>
      <Link href={destination}>{destination}</Link>
    </div>
  );
};

export default LinkMenuButton;
