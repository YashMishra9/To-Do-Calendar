"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session?.user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-[var(--color-primary)] text-white text-xs font-medium"
      >
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={session.user.image} alt={session.user.name ?? "User"} className="w-full h-full object-cover" />
        ) : (
          session.user.name?.[0]?.toUpperCase() ?? "U"
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 bg-white border border-[var(--color-border)] rounded-lg shadow-lg p-3 z-20">
            <p className="text-sm font-medium truncate">{session.user.name}</p>
            <p className="text-xs text-[var(--color-muted)] mb-3 truncate">{session.user.email}</p>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full text-left text-sm text-red-600 hover:bg-red-50 px-2 py-1.5 rounded-md"
            >
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}