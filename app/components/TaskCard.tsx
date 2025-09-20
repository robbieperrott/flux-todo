"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PenLine, X } from "lucide-react";
import { useState } from "react";

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

    async function deleteTask(e: React.FormEvent) {
        e.preventDefault();

        await fetch(`/api/tasks/${task.id}`, {
            method: "DELETE",
        });

        location.reload();
    }

    return <Card className="p-3">
        <CardContent className="flex px-2 justify-between items-center">
            <div className="flex items-center gap-4">
                <Checkbox onClick={updateTask} checked={task.complete}/>
                {task.description}
            </div>
            <div className="flex items-center gap-4">
                <EditTaskDescription taskId={task.id}/>
                <X size={20} onClick={deleteTask}/>
            </div>
        </CardContent>
    </Card>
}

interface EditTaskDescriptionProps {
    taskId: number;
}

function EditTaskDescription(props: EditTaskDescriptionProps) {
    const {taskId} = props;
  const [description, setDescription] = useState("");

  async function updateTaskName(e: React.FormEvent) {
        e.preventDefault();
        if (!description) return;

        await fetch(`/api/tasks/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description }),
        });

        setDescription("");
        location.reload();
    }

  return <Dialog>
            <DialogTrigger asChild>
            <PenLine size={20}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Change Task Name</DialogTitle>
                    </DialogHeader>
                    <Input
                        className="my-4"
                        type="text"
                        placeholder="Enter a new task name..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={updateTaskName}>Save</Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
}