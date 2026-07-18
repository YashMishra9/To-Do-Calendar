"use client";

import { ReactNode } from "react";
import { TasksProvider } from "@/context/TasksContext";

export default function Providers({ children }: { children: ReactNode }) {
  return <TasksProvider>{children}</TasksProvider>;
}