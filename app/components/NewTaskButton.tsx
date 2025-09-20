"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface NewTaskButtonProps {
    listId: number;
}

export default function NewTaskButton(props: NewTaskButtonProps) {
    const {listId} = props;
    const [description, setDescription] = useState("")

    const createTask = async (e: React.FormEvent) => {
         e.preventDefault();
        if (!description) return;

        await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ listId, description }),
        });

        location.reload();
    }

    return <Dialog>
            <DialogTrigger asChild>
            <Button>New Task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>New Task</DialogTitle>
                    </DialogHeader>
                    <Input
                        className="my-4"
                        type="text"
                        placeholder="Enter a new task description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={createTask}>Create</Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
}
