import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { AdminNav } from "@/components/layout/AdminNav";
import { getCurrentViewer } from "@/lib/auth";
import { hasClerkCredentials } from "@/lib/env";

export const metadata: Metadata = {
  title: "Admin | The Circle",
  description:
    "Admin dashboard for managing members, applications, events, and resources.",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (hasClerkCredentials) {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
      return redirectToSignIn({ returnBackUrl: "/admin" });
    }

    const viewer = await getCurrentViewer();
    if (!viewer.isAdmin) {
      redirect("/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen md:h-screen md:overflow-hidden" style={{ background: "var(--color-cream-100)" }}>
      <AdminNav />
      <main className="flex-1 min-w-0 overflow-visible md:h-screen md:overflow-y-auto pt-20 md:pt-0" style={{ background: "var(--color-cream-100)", color: "var(--color-text-primary)" }}>
        <div className="container-fluid py-8 md:py-10">{children}</div>
      </main>
    </div>
  );
}
