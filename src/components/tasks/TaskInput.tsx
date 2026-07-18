"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import CategorySelect from "./CategorySelect";
import PrioritySelect from "./PrioritySelect";
import { TaskCategory, TaskPriority } from "@/types/task";

interface TaskInputProps {
  onAdd: (title: string, category: TaskCategory, priority: TaskPriority, dueTime?: string) => void;
}

export default function TaskInput({ onAdd }: TaskInputProps) {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState<TaskCategory>("Work");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [dueTime, setDueTime] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed, category, priority, dueTime || undefined);
    setValue("");
    setDueTime("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 px-3 py-2 text-sm rounded-md border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
        <Button type="submit">Add Task</Button>
      </div>
      <div className="flex gap-2">
        <CategorySelect value={category} onChange={setCategory} />
        <PrioritySelect value={priority} onChange={setPriority} />
        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          aria-label="Due time (optional)"
          className="px-2 py-2 text-sm rounded-md border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>
    </form>
  );
}