import { getUser } from "@/lib/redis";
import styles from "@/styles/protected/nav.module.css";
import { currentUser } from "@clerk/nextjs/server";
import TitleLink from "../TitleLink";
import NavbarDropdown from "./NavbarDropdown";

const ProtectedNavbar = async () => {
  const user = await getUser((await currentUser())?.id);

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <TitleLink href="/dashboard" />
        </li>
        <li>
          <NavbarDropdown user={user} />
        </li>
      </ul>
    </nav>
  );
};

export default ProtectedNavbar;
