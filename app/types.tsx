import { List, Task } from "./generated/prisma/browser";

export type ListWithTasks = List & {tasks: Task[]}
