import PricingPlans from "@/components/home/PricingPlans";
import ShortenLinkWidget from "@/components/home/ShortenLinkWidget";
import styles from "@/styles/public/main.module.css";

export default function Page() {
  return (
    <main className={styles.main}>
      <h1>Simplify how you share online</h1>
      <p>
        Use our powerful URL shortener to create clean, clickable links that
        make sharing easier, perfect for simplifying your daily digital
        interactions.
      </p>
      <ShortenLinkWidget />
      <PricingPlans />
    </main>
  );
}
