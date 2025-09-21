
"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";
import { useEffect, useState } from "react";
import { updateList } from "../actions";

interface UpdateListTitleButtonProps {
    initialTitle: string;
    onUpdate: (newTitle: string) => Promise<void>;
}

export default function UpdateListTitle(props: UpdateListTitleButtonProps) {
    const {initialTitle, onUpdate} = props;
    const [title, setTitle] = useState(initialTitle);
    const [open, setOpen] = useState(false);

    async function updateListTitle(e: React.FormEvent) {
            e.preventDefault();
            setOpen(false);
            setTitle(initialTitle);
            onUpdate(title)
    }

    useEffect(() => {
        // Revert to initial title when dialog is opened or closed
        setTitle(initialTitle);
    }, [open])

    return <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <Button variant="ghost" size="icon"><PenLine size={20}/></Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
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