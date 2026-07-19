"use client";

import { ReactNode } from "react";
import { TasksProvider } from "@/context/TasksContext";
import SessionProviderWrapper from "@/components/providers/SessionProviderWrapper";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProviderWrapper>
      <TasksProvider>{children}</TasksProvider>
    </SessionProviderWrapper>
  );
}