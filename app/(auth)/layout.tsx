import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | The Circle",
  description:
    "Sign in to your The Circle member account to access the resource library, events, referral network, and more.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "#fff" }}>
      {/* Left — brand panel (desktop only) */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden" style={{ background: "#2D3B2C" }}>
        <div className="absolute inset-0 opacity-30" style={{ background: "url(/hero-bg.jpg) center/cover" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(194,150,58,0.12) 0%, transparent 65%)" }} />
        <div className="relative flex flex-col justify-center px-12 lg:px-16 w-full z-10">
          <div
            className="mb-3 w-72 max-w-full"
            aria-label="Austin Clinician Circle"
          >
            <img
              src="/logo-auth.png"
              alt=""
              width={1763}
              height={687}
              className="h-auto w-full object-contain"
            />
          </div>
          <h1
            className="leading-tight mb-4"
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(1.6rem, 2.5vw, 2.25rem)",
              fontWeight: 400,
              color: "#fff",
            }}
          >
            Deepen your work.
            <br />
            <em style={{ color: "#C2963A", fontStyle: "italic" }}>Find your people.</em>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            A professional community for licensed therapists in Austin, TX.
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 md:px-10 py-8 overflow-y-auto" style={{ background: "#F0EDE6" }}>
        {/* Mobile logo */}
        <div
          className="md:hidden mb-4 flex h-20 w-52 max-w-full items-center justify-center overflow-hidden px-3 py-2"
          style={{
            background: "var(--color-sage-800)",
          }}
        >
          <img
            src="/logo-auth.png"
            alt="Austin Clinician Circle"
            width={1763}
            height={687}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
