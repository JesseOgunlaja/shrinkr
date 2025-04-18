import PricingPlan from "@/components/home/PricingPlan";
import { getUser } from "@/lib/redis";
import styles from "@/styles/protected/update-plan.module.css";
import { currentUser } from "@clerk/nextjs/server";
import { Gem } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page() {
  const user = await getUser((await currentUser())?.id);
  if (user.plan !== "Free") notFound();

  return (
    <main className={styles.main}>
      <PricingPlan
        styles={styles}
        price="£0.99"
        cta={<Link href="/api/stripe/create-session">Upgrade now</Link>}
        priceDescription="One time payment"
        title="Premium"
        logo={<Gem />}
        features={[
          "Fast link redirects",
          "Unlimited shortened links",
          "Unlimited clicks on all links",
          "User friendly links",
          "Custom shortened URLs",
        ]}
      />
    </main>
  );
}
