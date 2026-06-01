import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AosInit } from "@/components/AosInit";
import { hasClerkCredentials } from "@/lib/env";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Circle",
  description:
    "The Circle is a virtual membership network for licensed therapists in Austin, TX. Deepen your work. Find your community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appShell = (
    <>
      <AosInit />
      {children}
    </>
  );

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {hasClerkCredentials ? <ClerkProvider>{appShell}</ClerkProvider> : appShell}
      </body>
    </html>
  );
}
