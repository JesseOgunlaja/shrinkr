"use client";

import { UserType } from "@/lib/types";
import styles from "@/styles/protected/nav.module.css";
import { UserButton } from "@clerk/nextjs";
import { CreditCard, Home } from "lucide-react";

interface PropsType {
  user: UserType;
}

const NavbarDropdown = ({ user }: PropsType) => {
  return (
    <UserButton
      appearance={{
        elements: {
          userButtonAvatarBox: styles.userAvatar,
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          labelIcon={<Home className={styles.dropdownSvg} />}
          label="Homepage"
          href="/home"
        />
        <UserButton.Action label="manageAccount" />
        {user.plan === "Free" ? (
          <UserButton.Link
            labelIcon={<CreditCard className={styles.dropdownSvg} />}
            label="Update plan"
            href="/update-plan"
          />
        ) : null}
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default NavbarDropdown;
