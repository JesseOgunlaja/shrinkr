import styles from "@/styles/public/footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2025 Shrinkr. All rights reserved.</p>
      <p>
        <Link href="/terms-of-service">Terms</Link> |{" "}
        <Link href="/privacy-policy">Privacy</Link>
      </p>
    </footer>
  );
};

export default Footer;
