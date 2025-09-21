"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { createTask } from "../actions";

interface NewTaskButtonProps {
    listId: number;
}

export default function NewTaskButton(props: NewTaskButtonProps) {
    const {listId} = props;
    const [description, setDescription] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await createTask(description, listId, location.pathname);
        setOpenDialog(false);  
    }

    return <Dialog open={openDialog}>
            <DialogTrigger onClick={() => setOpenDialog(true)} asChild>
            <Button><Plus/>New Task</Button>
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
                        <Button onClick={handleSubmit}>Create</Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
}
