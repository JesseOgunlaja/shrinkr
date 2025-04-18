import Footer from "@/components/Footer";
import ProtectedNavbar from "@/components/protected/ProtectedNavbar";
import PublicNavbar from "@/components/PublicNavbar";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
// import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Url Shortener",
  description: "",
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
