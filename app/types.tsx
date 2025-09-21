import { List, Task } from "./generated/prisma/browser";

export type ListWithTasks = List & {tasks: Task[]}

export type ListSortBy = 'createdAt' | 'title';

export type SortDirection = "asc" | "desc";