"use client";

import { signIn } from "next-auth/react";

export default function SignInButtons() {
  return (
    <div id="signin" className="flex flex-col gap-3 max-w-xs mx-auto px-6 pb-24">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="px-4 py-2.5 text-sm font-medium rounded-md border border-[var(--color-border)] bg-white hover:bg-neutral-50"
      >
        Sign in with Google
      </button>
      <button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="px-4 py-2.5 text-sm font-medium rounded-md text-white"
        style={{ backgroundColor: "var(--color-ink)" }}
      >
        Sign in with GitHub
      </button>
    </div>
  );
}