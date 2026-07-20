"use client";

import { useState, useRef, useEffect, KeyboardEvent, FocusEvent } from "react";
import { Task, TaskPriority } from "@/types/task";
import CategoryBadge from "./CategoryBadge";
import PriorityBadge from "./PriorityBadge";
import PrioritySelect from "./PrioritySelect";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, updates: { title?: string; priority?: TaskPriority }) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftPriority, setDraftPriority] = useState<TaskPriority>(task.priority);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  function startEditing() {
    setDraftTitle(task.title);
    setDraftPriority(task.priority);
    setIsEditing(true);
  }

  function commitEdit() {
    const trimmed = draftTitle.trim();
    if (trimmed && trimmed !== task.title) {
      onEdit(task.id, { title: trimmed });
    }
    setIsEditing(false);
  }

  function cancelEdit() {
    setDraftTitle(task.title);
    setDraftPriority(task.priority);
    setIsEditing(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") {
      e.stopPropagation();
      cancelEdit();
    }
  }

  function handlePriorityChange(newPriority: TaskPriority) {
    setDraftPriority(newPriority);
    if (newPriority !== task.priority) {
      onEdit(task.id, { priority: newPriority });
    }
  }

  // Only commit the title edit when focus leaves the whole editing group
  // (input + dropdown together) — not when it just moves between them.
  function handleGroupBlur(e: FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      commitEdit();
    }
  }

  function handleDelete() {
    if (window.confirm(`Delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  }

  return (
    <li className="flex items-center gap-2 py-2 border-b border-[var(--color-border)] last:border-b-0">
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark as not done" : "Mark as done"}
        className={`w-4 h-4 rounded-full border flex-shrink-0 transition-transform duration-150 active:scale-90 ${
          task.completed
            ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
            : "border-[var(--color-muted)]"
        }`}
      />

      <div
        className={`flex-1 min-w-0 transition-opacity duration-300 ${
          task.completed ? "opacity-50" : "opacity-100"
        }`}
      >
        {isEditing ? (
          <div className="flex items-center gap-2" onBlur={handleGroupBlur}>
            <input
              ref={inputRef}
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 text-sm px-1 py-0.5 rounded border border-[var(--color-primary)] focus:outline-none"
            />
            <PrioritySelect value={draftPriority} onChange={handlePriorityChange} />
          </div>
        ) : (
          <span
            onDoubleClick={startEditing}
            className={`text-sm cursor-text ${
              task.completed ? "line-through text-[var(--color-muted)]" : "text-[var(--color-ink)]"
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      {!isEditing && (
        <>
          {task.dueTime && (
            <span className="text-xs font-mono-stamp text-[var(--color-muted)] flex-shrink-0">
              {task.dueTime}
            </span>
          )}
          <PriorityBadge priority={task.priority} />
          <CategoryBadge category={task.category} />
          <button
            onClick={startEditing}
            aria-label="Edit task"
            className="text-[var(--color-muted)] hover:text-[var(--color-primary)] flex-shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            aria-label="Delete task"
            className="text-[var(--color-muted)] hover:text-red-500 flex-shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            </svg>
          </button>
        </>
      )}
    </li>
  );
}