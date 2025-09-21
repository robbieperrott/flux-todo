"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { createTask } from "../actions";

interface NewTaskButtonProps {
    onSubmit: (description: string) => Promise<void>;
}

export default function NewTaskButton(props: NewTaskButtonProps) {
    const {onSubmit} = props;

    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setOpen(false); 
        setDescription("");
        await onSubmit(description); 
    }

    return <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><Plus/>New Task</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>New Task</DialogTitle>
                    </DialogHeader>
                    <Input
                        className="my-4"
                        type="text"
                        placeholder="Describe your task here..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSubmit}>Create</Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
}
