"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react";
import { createList } from "../actions";


export default function NewListButton() {
    const [title, setTitle] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await createList(title, location.pathname);
        setOpenDialog(false);  
    }

    return (
        <Dialog open={openDialog}>
            <DialogTrigger onClick={() => setOpenDialog(true)} asChild>
                <Button><Plus/>New List</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
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
                            <Button onClick={() => setOpenDialog(false)} variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={title === ""}>Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}