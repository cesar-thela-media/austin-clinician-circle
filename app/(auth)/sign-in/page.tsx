import { SignIn } from "@clerk/nextjs";
import { AuthSetupNotice } from "@/components/auth/AuthSetupNotice";
import { hasClerkCredentials } from "@/lib/env";

export default function SignInPage() {
  if (!hasClerkCredentials) {
    return <AuthSetupNotice />;
  }

  return (
    <div className="w-full max-w-md">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
}
