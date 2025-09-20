"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

interface TaskCardProps {
  task: {complete: boolean;
  description: string;
  id: number;}
}

export default function TaskCard(props: TaskCardProps) {
    const {task} = props;

    async function updateTask(e: React.FormEvent) {
        e.preventDefault();
 
        await fetch(`/api/tasks/${task.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ complete: !task.complete }),
        });

        location.reload();
    }

    async function deleteList(e: React.FormEvent) {
        e.preventDefault();

        await fetch(`/api/tasks/${task.id}`, {
            method: "DELETE",
        });

        location.reload();
    }

    return <Card className="p-3">
        <CardContent className="flex justify-between items-center">
            <div className="flex px-2 items-center gap-4">
                <Checkbox onClick={updateTask} checked={task.complete}/>
                {task.description}
            </div>
            <X size={20} onClick={deleteList}/>
            
        </CardContent>
    </Card>
}