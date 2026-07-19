"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Calendar from "@/components/calendar/Calendar";
import TasksPanel from "@/components/tasks/TasksPanel";

function PlannerContent() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const searchParams = useSearchParams();
  const autoFocusInput = searchParams.get("new") === "true";

  return (
    <main className="flex-1 p-8 flex gap-6">
      <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      <TasksPanel selectedDate={selectedDate} autoFocusInput={autoFocusInput} />
    </main>
  );
}

export default function PlannerPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Suspense fallback={null}>
          <PlannerContent />
        </Suspense>
      </div>
    </div>
  );
}