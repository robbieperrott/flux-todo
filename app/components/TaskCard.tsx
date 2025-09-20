"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

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

    return <Card className="p-3">
        <CardContent onClick={updateTask} className="flex px-2 items-center gap-4">
            <Checkbox checked={task.complete}/>
            {task.description}
        </CardContent>
    </Card>
}