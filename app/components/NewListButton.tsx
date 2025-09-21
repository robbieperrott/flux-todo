"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react";
import { createList } from "../actions";


export default function NewListButton() {
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await createList(title, location.pathname);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><Plus/>New List</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>New List</DialogTitle>
                    </DialogHeader>
                    <Input
                            className="my-4"
                            type="text"
                            placeholder="Enter a new list name..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={title === ""}>Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}