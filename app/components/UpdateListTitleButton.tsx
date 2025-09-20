
"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";
import { useState } from "react";

interface UpdateListTitleButtonProps {
    listId: number;
}

export default function UpdateListTitle(props: UpdateListTitleButtonProps) {
    const {listId} = props;
  const [title, setTitle] = useState("");

  async function updateListTitle(e: React.FormEvent) {
        e.preventDefault();
        if (!title) return;

        await fetch(`/api/lists/${listId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
        });

        setTitle("");
        location.reload();
    }

  return <Dialog>
            <DialogTrigger asChild>
            <PenLine size={20}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Change List Name</DialogTitle>
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
                        <Button onClick={updateListTitle}>Save</Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
}