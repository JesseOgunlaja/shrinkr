"use client";

import { checkUser } from "@/actions/utils";
import styles from "@/styles/protected/loading.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/dashboard");
    const intervalId = setInterval(async () => {
      const userFound = await checkUser();
      if (userFound) {
        clearInterval(intervalId);
        router.replace("/dashboard");
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className={styles.main}>
      <p>We&apos;re just setting up your account</p>
      <div className={styles.loading}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </main>
  );
}
