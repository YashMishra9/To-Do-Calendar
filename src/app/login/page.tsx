import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import LandingHero from "@/components/auth/LandingHero";
import FeatureHighlights from "@/components/auth/FeatureHighlights";
import SignInButtons from "@/components/auth/SignInButtons";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <LandingHero />
      <FeatureHighlights />
      <SignInButtons />
    </div>
  );    
}