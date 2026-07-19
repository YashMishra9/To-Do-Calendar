"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { toDateKey, formatFullDate } from "@/lib/date";
import { useTasks } from "@/hooks/useTasks";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { filterTasks, StatusFilter } from "@/lib/filterTasks";
import { sortTasksBy, TaskSortOption } from "@/lib/sortTasks";
import { TaskCategory, TaskPriority } from "@/types/task";
import Panel from "@/components/ui/Panel";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import SearchBar from "./SearchBar";
import TaskFilters from "./TaskFilters";
import SortSelect from "./SortSelect";

interface TasksPanelProps {
  selectedDate: Date;
  autoFocusInput?: boolean;
}

export default function TasksPanel({ selectedDate, autoFocusInput }: TasksPanelProps) {
  const { getTasksForDate, addTask, toggleTask, editTask, deleteTask } = useTasks();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [category, setCategory] = useState<TaskCategory | "All">("All");
  const [priority, setPriority] = useState<TaskPriority | "All">("All");
  const [sortOption, setSortOption] = useState<TaskSortOption>("dueTime");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const taskInputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcuts({
    onSearchFocus: () => searchInputRef.current?.focus(),
    onNewTask: () => taskInputRef.current?.focus(),
    onEscape: () => setSearch(""),
  });

  useEffect(() => {
    if (autoFocusInput) {
      taskInputRef.current?.focus();
    }
  }, [autoFocusInput]);

  const dateKey = toDateKey(selectedDate);
  const allTasksForDay = getTasksForDate(dateKey);

  const visibleTasks = useMemo(() => {
    const filtered = filterTasks(allTasksForDay, { search, status, category, priority });
    return sortTasksBy(filtered, sortOption);
  }, [allTasksForDay, search, status, category, priority, sortOption]);

  const emptyState: "none" | "no-tasks" | "no-results" =
    allTasksForDay.length === 0 ? "no-tasks" : visibleTasks.length === 0 ? "no-results" : "none";

  return (
    <Panel className="w-80 shrink-0">
      <h2 className="text-base font-semibold mb-1">{formatFullDate(selectedDate)}</h2>
      <p className="text-xs text-[var(--color-muted)] mb-4">
        {allTasksForDay.length} task{allTasksForDay.length === 1 ? "" : "s"}
      </p>

      <TaskInput
        ref={taskInputRef}
        onAdd={(title, cat, pri, dueTime) => addTask(dateKey, title, cat, pri, dueTime)}
      />

      <SearchBar ref={searchInputRef} value={search} onChange={setSearch} />

      <TaskFilters
        status={status}
        onStatusChange={setStatus}
        category={category}
        onCategoryChange={setCategory}
        priority={priority}
        onPriorityChange={setPriority}
      />

      <div className="flex justify-end mb-2">
        <SortSelect value={sortOption} onChange={setSortOption} />
      </div>

      <TaskList
        tasks={visibleTasks}
        emptyState={emptyState}
        onToggle={(taskId) => toggleTask(dateKey, taskId)}
        onEdit={(taskId, updates) => editTask(dateKey, taskId, updates)}
        onDelete={(taskId) => deleteTask(dateKey, taskId)}
      />
    </Panel>
  );
}