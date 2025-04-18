import styles from "@/styles/protected/header.module.css";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const DashboardHeader = () => {
  return (
    <header className={styles.header}>
      <div>
        <p>
          Links <ExternalLink />
        </p>
        <Link href="/create-link">Create link</Link>
      </div>
      <hr />
    </header>
  );
};

export default DashboardHeader;
