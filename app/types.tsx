import { List, Task } from "./generated/prisma/browser";

// List and Task variations
export type ListWithTasks = List & { tasks: Task[] };
export type TaskDisplay = Task & { pending?: boolean };
export type ListDisplay = ListWithTasks & { pending?: boolean };

// Sorting and filtering
export type SortBy = "createdAt" | "text";
export type SortDirection = "asc" | "desc";
export type Filter = "complete" | "incomplete";
