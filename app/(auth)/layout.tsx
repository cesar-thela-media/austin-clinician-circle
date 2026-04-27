import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-cream-100)" }}
    >
      <header className="w-full px-5 md:px-6 py-4 md:py-5 flex items-center justify-between max-w-6xl mx-auto">
        <Link
          href="/"
          className="text-base font-semibold tracking-wide"
          style={{
            fontFamily: "var(--font-serif), Manrope, sans-serif",
            color: "var(--color-sage-800)",
          }}
        >
          Austin Clinician Circle
        </Link>
      </header>
      <main className="flex-1 flex items-start md:items-center justify-center px-5 md:px-6 py-10 md:py-16">
        {children}
      </main>
      <footer className="py-6 text-center text-xs" style={{ color: "var(--color-text-tertiary)" }}>
        © {new Date().getFullYear()} Austin Clinician Circle
      </footer>
    </div>
  );
}
