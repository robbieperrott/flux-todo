"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"


export default function NewListButton() {
    const [title, setTitle] = useState("");
    
    async function createList(e: React.FormEvent) {
        e.preventDefault();
        if (!title) return;

        await fetch("/api/lists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
        });

        location.reload();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
            <Button>New List</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={createList}>
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
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}