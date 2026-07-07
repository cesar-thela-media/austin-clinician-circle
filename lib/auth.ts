import { cookies } from "next/headers";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { clerkAdminEmails, hasClerkCredentials } from "@/lib/env";

const DEMO_NAME_COOKIE_OPTS = {
  path: "/",
  httpOnly: true,
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7,
};

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

// Single source of truth for "what name should appear on this member's
// certificate / profile" — reads from Clerk once it's configured, and
// falls back to the demo cookie set by the custom sign-in flow until then.
export async function getCurrentMemberName(): Promise<{ firstName: string; lastName: string }> {
  if (hasClerkCredentials) {
    const user = await currentUser();
    return { firstName: user?.firstName ?? "", lastName: user?.lastName ?? "" };
  }

  const jar = await cookies();
  const cleanName = (jar.get("acc_demo_name")?.value ?? "")
    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, "")
    .replace(/,.*$/, "")
    .trim();
  const [firstName = "", ...rest] = cleanName.split(/\s+/).filter(Boolean);
  return { firstName, lastName: rest.join(" ") };
}

export async function setCurrentMemberName(params: { firstName: string; lastName: string }) {
  if (hasClerkCredentials) {
    const { userId } = await auth();
    if (!userId) throw new Error("Not signed in.");
    const client = await clerkClient();
    await client.users.updateUser(userId, {
      firstName: params.firstName,
      lastName: params.lastName,
    });
    return;
  }

  const jar = await cookies();
  const fullName = `${params.firstName} ${params.lastName}`.trim().slice(0, 80);
  jar.set("acc_demo_name", fullName, DEMO_NAME_COOKIE_OPTS);
}
