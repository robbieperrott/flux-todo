import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";

interface NewListButtonProps {
    isPending: boolean;
    onSubmit: (newListTitle: string) => Promise<void>;
}

export default function NewListButton(props: NewListButtonProps) {
    const {isPending, onSubmit} = props;

    const [newListTitle, setNewListTitle] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        setNewListTitle("");
        setOpen(false);
        e.preventDefault();
        await onSubmit(newListTitle);
    }

    return <Dialog open={open} onOpenChange={setOpen}>
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
                                    value={newListTitle}
                                    onChange={(e) => setNewListTitle(e.target.value)}
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={isPending || newListTitle === ""}>Create</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
}