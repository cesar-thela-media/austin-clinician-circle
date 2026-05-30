import type { Metadata } from "next";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "The Circle | A professional community for licensed therapists",
  description:
    "The Circle is a virtual membership network for licensed therapists in Austin, TX. Deepen your work. Find your community.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
