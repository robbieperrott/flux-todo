"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import EditTaskDescription from "./EditTaskDescription";
import { Task } from "../generated/prisma/browser";

interface TaskCardProps {
  task: Task;
  onDelete: (task: Task) => Promise<void>
  onUpdate: (task: Task) => Promise<void>;
}

export default function TaskCard(props: TaskCardProps) {
    const {task, onDelete, onUpdate} = props;

    const updateTaskComplete = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({...task, complete: !task.complete})
    }

    async function handleDelete(e: React.FormEvent) {
        e.stopPropagation();
        onDelete(task);
    }

    const handleUpdateDescription = (description: string) => onUpdate({...task, description})

    return <Card className="py-4 px-6" onClick={updateTaskComplete}>
        <CardContent className="flex px-0 justify-between items-center">
            <div className="flex items-center gap-4 overflow-hidden">
                <Checkbox
                    checked={task.complete}
                />
                {task.description}
            </div>
            <div className="flex items-center gap-4 pl-4">
                {!task.complete && <EditTaskDescription taskId={task.id} onUpdate={handleUpdateDescription}/>}
                <X size={18} onClick={handleDelete}/>
            </div>
        </CardContent>
    </Card>
}
