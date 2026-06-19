"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 md:px-6"
      style={{ background: "#2D3B2C" }}
    >
      <div className="max-w-md text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 text-xl"
          style={{ background: "rgba(194,150,58,0.15)", color: "#C2963A" }}
        >
          ◈
        </div>
        <p
          className="text-[11px] font-medium uppercase tracking-[0.2em] mb-4"
          style={{ color: "#C2963A" }}
        >
          Something went wrong
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            color: "rgba(255,255,255,0.88)",
            marginBottom: "1rem",
            lineHeight: 1.2,
          }}
        >
          This page couldn&apos;t load.
        </h1>
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "rgba(255,255,255,0.48)" }}
        >
          A temporary error occurred. This is likely a network issue or a
          momentary glitch. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: "#C2963A", color: "#fff" }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
