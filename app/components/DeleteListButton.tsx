"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
 import { useRouter } from 'next/navigation';
import { deleteList } from "../actions";
import { useState } from "react";

interface DeleteListButtonProps {
    listId: number;
}

export default function DeleteListButton(props: DeleteListButtonProps) {
    const {listId} = props;

    const [open, setOpen] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await deleteList(listId, "/");
        setOpen(false);  
    }

    return <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon"><Trash/></Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>Delete List</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>Are you sure you want to delete this list? All its tasks will be deleted too.</DialogDescription>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={handleSubmit}>Delete</Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
}
