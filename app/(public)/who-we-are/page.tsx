import type { Metadata } from "next";
import Link from "next/link";

const values = [
  {
    title: "Clinical excellence",
    body: "We believe therapists do their best work when they are connected to other skilled clinicians who challenge and support them. Case consultation isn't optional. It's foundational.",
  },
  {
    title: "Sustainable practice",
    body: "Burnout is not inevitable. With the right structures, community, supervision, and personal care, therapists can build careers that last and practices that thrive.",
  },
  {
    title: "Professional identity",
    body: "Beyond your solo brand, there is a professional community you belong to. The Circle gives you a home, a directory listing, and colleagues who understand the work.",
  },
];

export const metadata: Metadata = {
  title: "Who We Are | The Circle",
  description:
    "Learn the story behind The Circle. Founded by Sarah Arnold, LPC-S, The Circle is a professional home and community for licensed therapists in Austin, TX.",
};

export default function WhoWeArePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-28 md:pt-32 pb-16 md:pb-20"
        style={{ background: "var(--color-cream-100)" }}
      >
        <div className="container-fluid text-center">
          <p
            className="text-xs font-medium uppercase tracking-widest mb-5"
            style={{ color: "var(--color-sage-600)" }}
          >
            Who we are
          </p>
          <h1
            className="leading-tight max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-serif), Manrope, sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
              fontWeight: 400,
              color: "var(--color-sage-900)",
            }}
          >
            A professional home and community for therapists
          </h1>
        </div>
      </section>

      {/* Origin */}
      <section
        className="py-16 md:py-24"
        style={{ background: "var(--color-cream-100)" }}
      >
        <div className="container-fluid text-center">
          <p
            className="text-xs font-medium uppercase tracking-widest mb-5"
            style={{ color: "var(--color-sage-600)" }}
          >
            The origin
          </p>
          <h2
            className="section-title-strong mb-10"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              color: "var(--color-sage-900)",
            }}
          >
            Why The Circle exists.
          </h2>
          <div
            className="flex flex-col gap-6 text-sm leading-relaxed max-w-2xl mx-auto text-left"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <p>
              Most of us didn&apos;t fully anticipate how solo private practice would
              feel. You&apos;re doing meaningful work, but there may not be a team
              down the hall, no built-in debrief, and some days that absence is
              more noticeable than others.
            </p>
            <p>
              The Circle was designed to address that gap: a small network of
              clinicians who meet regularly, share resources, make referrals to
              each other, and show up for one another professionally and in real
              community.
            </p>
            <p>
              Founding members are therapists who have been part of Sarah&apos;s
              professional circle, former associates, trusted colleagues, and
              clinicians she has supervised. As The Circle grows, membership is
              open to any licensed therapist who shares this commitment to
              ongoing clinical growth and community.
            </p>
          </div>
        </div>
      </section>

      <section
        className="py-16 md:py-24"
        style={{ background: "var(--color-cream-200)" }}
      >
        <div className="container-fluid grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="aspect-square rounded-2xl max-w-sm w-full mx-auto md:mx-0 lg:sticky lg:top-24 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sarah-arnold.jpeg"
              alt="Sarah Arnold, LPC-S"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <p
              className="text-xs font-medium uppercase tracking-widest mb-5"
              style={{ color: "var(--color-sage-600)" }}
            >
              The founder
            </p>
            <h2
              className="section-title-strong mb-6"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                color: "var(--color-sage-900)",
              }}
            >
              Sarah Arnold, LPC-S
            </h2>
            <div
              className="flex flex-col gap-5 text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <p>
                Sarah is a Licensed Professional Counselor and Supervisor based
                in Austin, Texas, and the founder of Restored Family
                Counseling. She has spent her career working with individuals
                and couples doing the deeper work, exploring the parts of
                themselves that have been running the show, releasing what no
                longer serves them, and stepping into a life that feels in
                alignment with who they truly desire to be.
              </p>
              <p>
                As she built her group practice and supervised pre-licensed
                associates, she noticed a pattern: once therapists became fully
                licensed and launched their own practices, they lost the
                built-in community they had during training. Supervision groups
                ended. Colleagues scattered. What had once felt like a team
                became, almost overnight, a practice of one.
              </p>
              <p>
                The Circle is Sarah&apos;s answer to that problem.
                It is not a supervision group, a continuing education provider,
                or a therapist directory, though it includes elements of all
                three. It is a membership network: a professional community for
                therapists who want to keep growing, stay connected, and do
                excellent work over the long term.
              </p>
            </div>
            <a
              href="https://www.restoredfamily.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 text-sm font-medium underline"
              style={{
                color: "var(--color-sage-700)",
                textUnderlineOffset: "4px",
              }}
            >
              Visit Restored Family Counseling →
            </a>
          </div>
        </div>
      </section>

      <section
        className="py-16 md:py-24"
        style={{ background: "var(--color-cream-200)" }}
      >
        <div className="container-fluid">
          <div className="max-w-5xl mx-auto text-center mb-10 md:mb-14">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-5"
              style={{ color: "var(--color-sage-600)" }}
            >
              What we believe
            </p>
            <h2
              className="section-title-strong"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                color: "var(--color-sage-900)",
              }}
            >
              The values that shape The Circle.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {values.map((value) => (
              <div key={value.title} className="text-center md:text-left lg:text-center">
                <h3
                  className="text-base font-semibold mb-3"
                  style={{ color: "var(--color-sage-800)" }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 md:py-24 text-center"
        style={{ background: "var(--color-sage-900)" }}
      >
        <div className="max-w-2xl mx-auto px-5 md:px-6">
          <h2
            className="section-title-strong mb-6"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              color: "#fff",
            }}
          >
            This is the community you&apos;ve been looking for.
          </h2>
          <Link
            href="/join"
            className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ background: "#fff", color: "var(--color-sage-700)" }}
          >
            Join the circle
          </Link>
        </div>
      </section>
    </>
  );
}
