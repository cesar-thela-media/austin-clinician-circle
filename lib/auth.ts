import { cookies } from "next/headers";
import { currentUser } from "@clerk/nextjs/server";
import { clerkAdminEmails, hasClerkCredentials } from "@/lib/env";

export function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  return clerkAdminEmails.includes(email.trim().toLowerCase());
}

export async function getCurrentViewer() {
  if (!hasClerkCredentials) {
    const jar = await cookies();
    const email = jar.get("acc_demo_email")?.value ?? null;
    return {
      user: null,
      primaryEmail: email,
      isAdmin: false,
    };
  }

  const user = await currentUser();
  const primaryEmail =
    user?.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress || user?.emailAddresses[0]?.emailAddress || null;

  return {
    user,
    primaryEmail,
    isAdmin: isAdminEmail(primaryEmail),
  };
}
