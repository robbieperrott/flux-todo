import { List, Task } from "./generated/prisma/browser";

export type ListWithTasks = List & {tasks: Task[]}
export type SortBy = "createdAt" | "text";
export type SortDirection = "asc" | "desc";