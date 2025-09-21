"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import EditTaskDescription from "./EditTaskDescription";
import { deleteTask, updateTask } from "../actions";
import { useOptimistic, useTransition } from "react";
import { Task } from "../generated/prisma/browser";

interface TaskCardProps {
  task: Task
}

export default function TaskCard(props: TaskCardProps) {
    const {task} = props;

    const [isPending, startTransition] = useTransition();

    const [optimisticTask, updateOptimisticTask] = useOptimistic<
        Task,
        Partial<Task>
    >(
        task,
        (currentTask, optimisticTask) => {
            return {...currentTask, ...optimisticTask}
        }
    );

    const updateTaskComplete = (e: React.FormEvent) => startTransition(async () => {
        e.preventDefault();
        updateOptimisticTask({complete: !task.complete})
        await updateTask({id: task.id, complete: !task.complete}, location.pathname);
    })

    async function handleDelete(e: React.FormEvent) {
        e.preventDefault();
        await deleteTask(task.id, location.pathname)
    }

    return <Card className="p-3" onClick={updateTaskComplete}>
        <CardContent className="flex px-2 justify-between items-center">
            <div className="flex items-center gap-4">
                <Checkbox
                    disabled={isPending}    // Don't allow further changes while transition is happening
                    checked={optimisticTask.complete}
                />
                {optimisticTask.description}
            </div>
            <div className="flex items-center gap-4">
                <EditTaskDescription taskId={task.id}/>
                <X size={20} onClick={handleDelete}/>
            </div>
        </CardContent>
    </Card>
}
