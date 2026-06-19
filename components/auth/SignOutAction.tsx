"use client";

import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { hasClerkPublishableKey } from "@/lib/public-env";

type SignOutActionProps = {
  label?: string;
  className?: string;
  style?: CSSProperties;
  onSignedOut?: () => void;
};

export function SignOutAction({
  label = "Sign out",
  className = "",
  style,
  onSignedOut,
}: SignOutActionProps) {
  const router = useRouter();

  if (!hasClerkPublishableKey) {
    async function handleDemoSignOut() {
      await fetch("/api/mock-auth", { method: "DELETE" });
      onSignedOut?.();
      router.push("/sign-in");
      router.refresh();
    }
    return (
      <button type="button" className={className} style={style} onClick={handleDemoSignOut}>
        <span>⇤</span> {label}
      </button>
    );
  }

  return (
    <SignOutButton>
      <button type="button" className={className} style={style} onClick={onSignedOut}>
        <span>⇤</span> {label}
      </button>
    </SignOutButton>
  );
}
