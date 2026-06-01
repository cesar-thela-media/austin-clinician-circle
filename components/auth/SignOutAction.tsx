"use client";

import type { CSSProperties } from "react";
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
  if (!hasClerkPublishableKey) {
    return (
      <a href="/sign-in" className={className} style={style}>
        <span>⇤</span> {label}
      </a>
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
