import { SignUp } from "@clerk/nextjs";
import { MockSignIn } from "@/components/auth/MockSignIn";
import { hasClerkCredentials } from "@/lib/env";

export default function SignUpPage() {
  if (!hasClerkCredentials) {
    return <MockSignIn redirectTo="/dashboard/billing" />;
  }

  return (
    <div className="w-full max-w-md">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/dashboard/billing"
        appearance={{
          variables: {
            colorPrimary: "#C2963A",
            colorBackground: "#F0EDE6",
            colorText: "#1A1A1A",
            colorTextSecondary: "#3D4A3B",
            colorInputBackground: "#ffffff",
            colorInputText: "#1A1A1A",
            borderRadius: "10px",
            fontFamily: "inherit",
          },
          elements: {
            card: { boxShadow: "0 4px 24px rgba(45,59,44,0.10)", border: "1px solid rgba(194,150,58,0.15)" },
            formButtonPrimary: { backgroundColor: "#C2963A" },
            footerActionLink: { color: "#C2963A" },
          },
        }}
      />
    </div>
  );
}
