"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Calendar from "@/components/calendar/Calendar";
import TasksPanel from "@/components/tasks/TasksPanel";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 flex gap-6">
          <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          <TasksPanel selectedDate={selectedDate} />
        </main>
      </div>
    </div>
  );
}