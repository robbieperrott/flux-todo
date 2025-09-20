"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
 import { useRouter } from 'next/navigation';

interface DeleteListButtonProps {
    listId: number;
}

export default function DeleteListButton(props: DeleteListButtonProps) {
    const {listId} = props;

    const router = useRouter();

    async function deleteList(e: React.FormEvent) {
        e.preventDefault();

        await fetch(`/api/lists/${listId}`, {
            method: "DELETE",
        });

        router.replace("/");
    }

    return <Dialog>
            <DialogTrigger asChild>
            <Trash size={20}/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete List</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>Are you sure you want to delete this list? All its tasks will be deleted too.</DialogDescription>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={deleteList}>Delete</Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
}