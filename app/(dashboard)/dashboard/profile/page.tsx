import { getCurrentMemberName } from "@/lib/auth";
import { ProfileForm } from "./ProfileForm";

export default async function ProfilePage() {
  const { firstName, lastName } = await getCurrentMemberName();
  return <ProfileForm initialFirstName={firstName} initialLastName={lastName} />;
}
