import Footer from "@/components/Footer";
import ProtectedNavbar from "@/components/protected/ProtectedNavbar";
import PublicNavbar from "@/components/PublicNavbar";
import { env } from "@/lib/env";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Shrinkr",
    template: "Shrinkr | %s",
  },
  metadataBase: new URL(env.BASE_URL),
  description: "A URL shortener",
  keywords: ["URL shortener", "shrinkr", "Jesse Ogunlaja"],
  authors: [
    {
      name: "Jesse Ogunlaja",
    },
  ],
  openGraph: {
    title: "Shrinkr",
    description: "A URL shortener",
    images: ["https://shrinkr.dev/opengraph.png"],
    locale: "en_GB",
  },
  creator: "Jesse Ogunlaja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className}`}>
          <Analytics />
          <div id="wrapper">
            <Toaster richColors position="top-right" closeButton />
            <SignedIn>
              <ProtectedNavbar />
            </SignedIn>
            <SignedOut>
              <PublicNavbar />
            </SignedOut>
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
