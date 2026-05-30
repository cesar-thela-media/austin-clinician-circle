"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

const LICENSE_TYPES = ["LPC", "LCSW", "LMFT", "LPC-S", "PhD", "PsyD", "Other"];
const SPECIALTIES = [
  "Anxiety", "Trauma", "Depression", "EMDR", "Somatic", "OCD", "Couples",
  "Family", "LGBTQ+", "Grief", "Adolescents", "Men", "Women", "Perinatal",
  "Workplace", "Burnout", "Mindfulness", "Cultural Identity",
];
const FORMATS = ["In-person", "Telehealth", "Both"];

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [licenseType, setLicenseType] = useState("LPC");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(["Anxiety", "Trauma", "EMDR"]);
  const [format, setFormat] = useState("Both");
  const [officeLocation, setOfficeLocation] = useState("");
  const [accepting, setAccepting] = useState(true);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handlePhotoClick() {
    fileInputRef.current?.click();
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  function toggleSpecialty(s: string) {
    setSelectedSpecialties((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div
      className="flex flex-col gap-8 max-w-4xl"
      style={{
        ["--input-label-color" as string]: "var(--color-text-secondary)",
        ["--input-hint-color" as string]: "var(--color-text-tertiary)",
        ["--input-text-color" as string]: "var(--color-text-primary)",
      }}
    >
      <div>
        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--color-sage-600)" }}>Profile</p>
        <h1 className="text-page-title">
          Edit your profile
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
          Your profile appears in The Circle member directory and clinician search.
        </p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-8">
        {/* Photo */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--color-sage-700)" }}>Photo</h2>
          <div className="flex items-center gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-medium overflow-hidden shrink-0"
              style={{ background: photoPreview ? "transparent" : "var(--color-sage-100)", color: "var(--color-sage-500)" }}
            >
              {photoPreview ? (
                <img src={photoPreview} alt="Profile preview" className="w-full h-full object-cover" />
              ) : (
                "J"
              )}
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                onChange={handlePhotoChange}
                className="hidden"
                aria-label="Upload profile photo"
              />
              <Button type="button" variant="secondary" size="sm" onClick={handlePhotoClick}>
                {photoPreview ? "Change photo" : "Upload photo"}
              </Button>
              <p className="text-xs mt-1.5" style={{ color: "var(--color-text-tertiary)" }}>
                JPG or PNG. 2MB max. Square crops best.
              </p>
            </div>
          </div>
        </section>

        <hr style={{ borderColor: "rgba(197,200,190,0.5)" }} />

        {/* Basic info */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--color-sage-700)" }}>Basic information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="First name" defaultValue="Jane" name="firstName" />
            <Input label="Last name" defaultValue="Hollister" name="lastName" />
          </div>
          <Input label="Email address" type="email" defaultValue="jane@example.com" name="email" />
          <Input label="City, State" defaultValue="Austin, TX" name="city" hint="Displayed publicly on your profile." />
        </section>

        <hr style={{ borderColor: "rgba(197,200,190,0.5)" }} />

        {/* Credentials */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--color-sage-700)" }}>Credentials</h2>
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>License type</label>
            <div className="flex flex-wrap gap-2">
              {LICENSE_TYPES.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLicenseType(l)}
                  className="px-4 py-1.5 rounded-full text-xs font-medium transition-colors"
                  style={{
                    background: licenseType === l ? "var(--color-sage-700)" : "#fff",
                    color: licenseType === l ? "#fff" : "var(--color-sage-700)",
                    border: `1px solid ${licenseType === l ? "var(--color-sage-700)" : "var(--color-cream-300)"}`,
                  }}
                >{l}</button>
              ))}
            </div>
          </div>
          <Input label="License number" defaultValue="LPC-80042" name="licenseNumber" />
          <Input label="Supervising clinician (if applicable)" placeholder="Name, credentials" name="supervisor" />
        </section>

        <hr style={{ borderColor: "rgba(197,200,190,0.5)" }} />

        {/* Bio & specialties */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--color-sage-700)" }}>Practice profile</h2>
          <Textarea
            label="Professional bio"
            name="bio"
            rows={5}
            hint="Shown on your public directory listing. Write in first person, for a clinical audience."
            defaultValue="I'm a licensed professional counselor in Austin, TX with a focus on trauma and anxiety. I work primarily with adults using EMDR and somatic approaches."
          />
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
              Specialties <span style={{ color: "var(--color-text-tertiary)" }}>(select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {SPECIALTIES.map((s) => {
                const sel = selectedSpecialties.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSpecialty(s)}
                    className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                    style={{
                      background: sel ? "var(--color-sage-700)" : "#fff",
                      color: sel ? "#fff" : "var(--color-sage-700)",
                      border: `1px solid ${sel ? "var(--color-sage-700)" : "var(--color-cream-300)"}`,
                    }}
                  >{s}</button>
                );
              })}
            </div>
          </div>
        </section>

        <hr style={{ borderColor: "rgba(197,200,190,0.5)" }} />

        {/* Availability */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--color-sage-700)" }}>Availability</h2>
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>Service format</label>
            <div className="flex gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  className="px-4 py-1.5 rounded-full text-xs font-medium transition-colors"
                  style={{
                    background: format === f ? "var(--color-sage-700)" : "#fff",
                    color: format === f ? "#fff" : "var(--color-sage-700)",
                    border: `1px solid ${format === f ? "var(--color-sage-700)" : "var(--color-cream-300)"}`,
                  }}
                >{f}</button>
              ))}
            </div>
          </div>
          {(format === "In-person" || format === "Both") && (
            <Input
              label="Office location"
              value={officeLocation}
              onChange={(e) => setOfficeLocation(e.target.value)}
              placeholder="Ex: South Austin, Westlake, Cedar Park, Dallas"
              hint="Shown on your public directory listing so clients know where you practice."
            />
          )}
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={accepting}
              onClick={() => setAccepting((v) => !v)}
              className="relative w-10 h-6 rounded-full transition-colors"
              style={{ background: accepting ? "var(--color-sage-700)" : "var(--color-cream-400)" }}
            >
              <span
                className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform"
                style={{ transform: accepting ? "translateX(16px)" : "translateX(0)" }}
              />
            </button>
            <label className="text-sm cursor-pointer" style={{ color: "var(--color-text-secondary)" }}
              onClick={() => setAccepting((v) => !v)}
            >
              Currently accepting new clients
            </label>
          </div>
        </section>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <Button type="submit" variant="primary" size="md">Save changes</Button>
          {saved && (
            <p className="text-sm font-medium" style={{ color: "var(--color-success)" }}>
              Profile saved.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
