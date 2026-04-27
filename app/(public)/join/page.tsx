"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const STEPS = ["About you", "Your practice", "Confirm"];

const licenseTypes = ["LPC", "LCSW", "LMFT", "PhD", "PsyD", "LPC-A", "Other"];
const specialtyOptions = [
  "Anxiety & OCD",
  "Attachment & Relational",
  "Couples & Marriage",
  "Depression",
  "EMDR",
  "Family Systems",
  "Grief & Loss",
  "Trauma & PTSD",
  "Somatic",
  "Adolescents",
  "Children",
  "LGBTQ+",
  "Perinatal Mental Health",
  "Spirituality & Faith",
];
const modalityOptions = [
  "Individual therapy",
  "Couples therapy",
  "Family therapy",
  "Group therapy",
];

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseType: string;
  licenseNumber: string;
  yearsLicensed: string;
  practiceName: string;
  practiceCity: string;
  format: string;
  specialties: string[];
  modalities: string[];
  bio: string;
  whyACC: string;
};

const empty: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  licenseType: "",
  licenseNumber: "",
  yearsLicensed: "",
  practiceName: "",
  practiceCity: "",
  format: "",
  specialties: [],
  modalities: [],
  bio: "",
  whyACC: "",
};

export default function JoinPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(empty);
  const [submitted, setSubmitted] = useState(false);

  function set(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleMulti(field: "specialties" | "modalities", value: string) {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter((v) => v !== value)
        : [...f[field], value],
    }));
  }

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center pt-20 md:pt-16 px-5 md:px-6"
        style={{ background: "var(--color-cream-100)" }}
      >
        <div className="max-w-md text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-8 text-2xl"
            style={{
              background: "var(--color-sage-100)",
              color: "var(--color-sage-700)",
            }}
          >
            ✓
          </div>
          <h1
            className="mb-4"
            style={{
              fontFamily: "var(--font-serif), Manrope, sans-serif",
              fontSize: "2rem",
              fontWeight: 400,
              color: "var(--color-sage-900)",
            }}
          >
            Application received.
          </h1>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Thank you, {form.firstName}. Sarah reviews every application
            personally and will be in touch within a few business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pt-20 md:pt-24 pb-16 md:pb-20"
      style={{ background: "var(--color-cream-100)" }}
    >
      <div className="max-w-xl mx-auto px-5 md:px-6">
        {/* Header */}
        <p
          className="text-xs font-medium uppercase tracking-widest mb-4"
          style={{ color: "var(--color-sage-600)" }}
        >
          Membership application
        </p>
        <h1
          className="mb-10"
          style={{
            fontFamily: "var(--font-serif), Manrope, sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 400,
            color: "var(--color-sage-900)",
          }}
        >
          Join the Austin Clinician Circle.
        </h1>

        {/* Step indicator */}
        <div className="flex flex-wrap items-center gap-3 gap-y-3 mb-8 md:mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors"
                  style={{
                    background:
                      i <= step
                        ? "var(--color-sage-700)"
                        : "var(--color-cream-300)",
                    color: i <= step ? "#fff" : "var(--color-text-tertiary)",
                  }}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className="text-xs font-medium hidden sm:block"
                  style={{
                    color:
                      i === step
                        ? "var(--color-sage-700)"
                        : "var(--color-text-tertiary)",
                  }}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="h-px w-5 sm:w-8"
                  style={{
                    background:
                      i < step
                        ? "var(--color-sage-700)"
                        : "var(--color-cream-300)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* STEP 1 — About you */}
        {step === 0 && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First name"
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                placeholder="Jane"
              />
              <Input
                label="Last name"
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                placeholder="Smith"
              />
            </div>
            <Input
              label="Email address"
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="jane@example.com"
            />
            <Input
              label="Phone number"
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="(512) 000-0000"
            />
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--color-text-primary)" }}
              >
                License type
              </label>
              <div className="flex flex-wrap gap-2">
                {licenseTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => set("licenseType", t)}
                    className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
                    style={{
                      background:
                        form.licenseType === t
                          ? "var(--color-sage-700)"
                          : "var(--color-sage-50)",
                      color:
                        form.licenseType === t
                          ? "#fff"
                          : "var(--color-sage-700)",
                      border:
                        form.licenseType === t
                          ? "none"
                          : "1px solid var(--color-cream-300)",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="License number"
              value={form.licenseNumber}
              onChange={(e) => set("licenseNumber", e.target.value)}
              placeholder="TX-12345"
            />
            <Input
              label="Years licensed"
              type="number"
              min="0"
              value={form.yearsLicensed}
              onChange={(e) => set("yearsLicensed", e.target.value)}
              placeholder="3"
            />
            <Button
              onClick={() => setStep(1)}
              className="w-full mt-2"
            >
              Continue →
            </Button>
          </div>
        )}

        {/* STEP 2 — Your practice */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <Input
              label="Practice name (if any)"
              value={form.practiceName}
              onChange={(e) => set("practiceName", e.target.value)}
              placeholder="Clarity Counseling"
            />
            <Input
              label="City / area"
              value={form.practiceCity}
              onChange={(e) => set("practiceCity", e.target.value)}
              placeholder="Austin, TX"
            />
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--color-text-primary)" }}
              >
                Practice format
              </label>
              <div className="flex flex-wrap gap-2">
                {["Virtual only", "In-person only", "Hybrid"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => set("format", f)}
                    className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
                    style={{
                      background:
                        form.format === f
                          ? "var(--color-sage-700)"
                          : "var(--color-sage-50)",
                      color:
                        form.format === f ? "#fff" : "var(--color-sage-700)",
                      border:
                        form.format === f
                          ? "none"
                          : "1px solid var(--color-cream-300)",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--color-text-primary)" }}
              >
                Specialties{" "}
                <span style={{ color: "var(--color-text-tertiary)" }}>
                  (select all that apply)
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {specialtyOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleMulti("specialties", s)}
                    className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
                    style={{
                      background: form.specialties.includes(s)
                        ? "var(--color-sage-700)"
                        : "var(--color-sage-50)",
                      color: form.specialties.includes(s)
                        ? "#fff"
                        : "var(--color-sage-700)",
                      border: form.specialties.includes(s)
                        ? "none"
                        : "1px solid var(--color-cream-300)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--color-text-primary)" }}
              >
                Modalities
              </label>
              <div className="flex flex-wrap gap-2">
                {modalityOptions.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => toggleMulti("modalities", m)}
                    className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
                    style={{
                      background: form.modalities.includes(m)
                        ? "var(--color-sage-700)"
                        : "var(--color-sage-50)",
                      color: form.modalities.includes(m)
                        ? "#fff"
                        : "var(--color-sage-700)",
                      border: form.modalities.includes(m)
                        ? "none"
                        : "1px solid var(--color-cream-300)",
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <Textarea
              label="Brief bio"
              rows={4}
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
              placeholder="A short paragraph about your clinical background and approach (this will appear on your directory profile)."
              hint="This will appear on your public directory listing."
            />
            <Textarea
              label="Why do you want to join ACC?"
              rows={3}
              value={form.whyACC}
              onChange={(e) => set("whyACC", e.target.value)}
              placeholder="What are you hoping to get from this community?"
            />
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button variant="secondary" onClick={() => setStep(0)} className="flex-1">
                ← Back
              </Button>
              <Button onClick={() => setStep(2)} className="flex-1">
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3 — Confirm */}
        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div
              className="rounded-2xl border p-6 flex flex-col gap-4"
              style={{
                borderColor: "var(--color-cream-300)",
                background: "#fff",
              }}
            >
              <h3
                className="text-sm font-semibold"
                style={{ color: "var(--color-sage-800)" }}
              >
                Review your application
              </h3>
              <div className="flex flex-col gap-2 text-sm">
                {[
                  ["Name", `${form.firstName} ${form.lastName}`],
                  ["Email", form.email],
                  ["License", `${form.licenseType} ${form.licenseNumber}`],
                  ["Years licensed", form.yearsLicensed],
                  ["Practice", form.practiceName || "—"],
                  ["Location", form.practiceCity],
                  ["Format", form.format],
                  ["Specialties", form.specialties.join(", ") || "—"],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                    <span
                      className="w-full sm:w-32 shrink-0 font-medium"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {label}
                    </span>
                    <span style={{ color: "var(--color-text-primary)" }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl border p-5 text-sm"
              style={{
                borderColor: "var(--color-sage-100)",
                background: "var(--color-sage-50)",
                color: "var(--color-sage-700)",
              }}
            >
              Membership is $129/month, billed monthly. Payment details will be
              collected after Sarah reviews and approves your application.
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">
                ← Back
              </Button>
              <Button onClick={() => setSubmitted(true)} className="flex-1">
                Submit application
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
