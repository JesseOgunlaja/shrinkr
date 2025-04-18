import CheckoutSuccess from "@/components/protected/CheckoutSuccess";
import DashboardHeader from "@/components/protected/DashboardHeader";
import LinkMenuButton from "@/components/protected/LinkMenuButton";
import { env } from "@/lib/env";
import { getUser } from "@/lib/redis";
import styles from "@/styles/protected/dashboard.module.css";
import { currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

interface PropsType {
  searchParams: Promise<Record<string, string>>;
}

export default async function Page({ searchParams }: PropsType) {
  const user = await getUser((await currentUser())?.id);

  const { session_id } = await searchParams;
  let success = false;

  try {
    const { metadata } = await stripe.checkout.sessions.retrieve(
      session_id,
      {}
    );
    success = user.id === metadata?.id;
  } catch {}

  return (
    <div id={styles.wrapper}>
      <CheckoutSuccess success={success} />
      <DashboardHeader />
      <main className={styles.main}>
        {user.links.map((link) => (
          <LinkMenuButton key={link.backhalf} link={link} />
        ))}
      </main>
    </div>
  );
}
