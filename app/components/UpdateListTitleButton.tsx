
"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";
import { useState } from "react";
import { updateList } from "../actions";

interface UpdateListTitleButtonProps {
    listId: number;
}

export default function UpdateListTitle(props: UpdateListTitleButtonProps) {
    const {listId} = props;
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  async function updateListTitle(e: React.FormEvent) {
        e.preventDefault();
        await updateList({id: listId, title}, location.pathname);
        setOpen(false);
  }

  return <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <PenLine size={20}/>
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