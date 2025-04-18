import styles from "@/styles/public/nav.module.css";
import Link from "next/link";
import TitleLink from "./TitleLink";

const PublicNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <TitleLink href="/" />
        </li>
        <li>
          <Link href="/signin">Sign in</Link>
        </li>
        <li>
          <Link href="/signup">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default PublicNavbar;
