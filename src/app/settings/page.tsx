import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Panel from "@/components/ui/Panel";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8">
          <Panel className="max-w-md">
            <h2 className="text-base font-semibold mb-4">Account</h2>
            <div className="flex items-center gap-3">
              {session.user.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt="" className="w-12 h-12 rounded-full" />
              )}
              <div>
                <p className="text-sm font-medium">{session.user.name}</p>
                <p className="text-xs text-[var(--color-muted)]">{session.user.email}</p>
              </div>
            </div>
          </Panel>
        </main>
      </div>
    </div>
  );
}