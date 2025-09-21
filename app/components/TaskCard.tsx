"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import EditTaskDescription from "./EditTaskDescription";
import { Task } from "../generated/prisma/browser";
import DeleteTaskButton from "./DeleteTaskButton";

interface TaskCardProps {
  task: Task;
  onDelete: () => Promise<void>
  onUpdate: (task: Task) => Promise<void>;
}

export default function TaskCard(props: TaskCardProps) {
    const {task, onDelete, onUpdate} = props;

    const updateTaskComplete = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({...task, complete: !task.complete})
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
            <div className="flex items-center gap-2 pl-4">
                {!task.complete && <EditTaskDescription initialDescription={task.description} onUpdate={handleUpdateDescription}/>}
                <DeleteTaskButton onDelete={onDelete}/>
            </div>
        </CardContent>
    </Card>
}
