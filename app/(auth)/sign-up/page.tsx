import { SignUp } from "@clerk/nextjs";
import { AuthSetupNotice } from "@/components/auth/AuthSetupNotice";
import { hasClerkCredentials } from "@/lib/env";

export default function SignUpPage() {
  if (!hasClerkCredentials) {
    return <AuthSetupNotice />;
  }

  return (
    <div className="w-full max-w-md">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/dashboard/billing"
      />
    </div>
  );
}
