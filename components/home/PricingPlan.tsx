import baseStyles from "@/styles/public/main.module.css";
import { Check } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface PropsType {
  price: string;
  styles?: Record<string, string>;
  priceDescription: string;
  logo: ReactNode;
  title: string;
  features: string[];
  cta?: ReactNode;
}

const PricingPlan = ({
  price,
  title,
  logo,
  styles = baseStyles,
  cta,
  features,
  priceDescription,
}: PropsType) => {
  return (
    <article>
      <div>
        {logo}
        <p>{title}</p>
      </div>
      <div>
        <p>
          {price} <span>{priceDescription}</span>
        </p>
        {cta || <Link href="/signup">Get started now</Link>}
        <p>Features:</p>
        <div className={styles.features}>
          {features.map((feature) => (
            <div key={feature}>
              <p>
                <Check /> {feature}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PricingPlan;
