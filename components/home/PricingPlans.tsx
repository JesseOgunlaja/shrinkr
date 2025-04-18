import styles from "@/styles/public/main.module.css";
import { Gem, Star } from "lucide-react";
import PricingPlan from "./PricingPlan";

const PricingPlans = () => {
  return (
    <section className={styles.pricing}>
      <p>
        Worry about your <span>links</span>,<br /> not your pricing.
      </p>
      <div className={styles.plans}>
        <PricingPlan
          price="£0"
          title="Free"
          priceDescription="Free forever"
          logo={<Star />}
          features={[
            "Fast link redirects",
            "Unlimited shortened links",
            "Unlimited clicks on all links",
            "User friendly links",
            "Random shortened URLs",
          ]}
        />
        <PricingPlan
          price="£0.99"
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
      </div>
    </section>
  );
};

export default PricingPlans;
