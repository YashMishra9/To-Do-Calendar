/** Generates a unique id. Centralized so the strategy (e.g. crypto.randomUUID) can change in one place. */
export function generateId(): string {
    return crypto.randomUUID();
  }