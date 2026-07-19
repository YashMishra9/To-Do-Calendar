"use client";

import { useEffect } from "react";

interface ShortcutHandlers {
  onSearchFocus: () => void;
  onNewTask: () => void;
  onEscape: () => void;
}

export function useKeyboardShortcuts({ onSearchFocus, onNewTask, onEscape }: ShortcutHandlers) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT";

      if (e.key === "Escape") {
        onEscape();
        return;
      }

      if (isTyping) return;

      if (e.key === "/") {
        e.preventDefault();
        onSearchFocus();
      } else if (e.key.toLowerCase() === "n") {
        e.preventDefault();
        onNewTask();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearchFocus, onNewTask, onEscape]);
}