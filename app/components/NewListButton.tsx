import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface NewListButtonProps {
    isPending: boolean;
    newListTitle: string;
    onNewListTitleChange: (title: string) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
}

export default function NewListButton(props: NewListButtonProps) {
    const {isPending, newListTitle, onNewListTitleChange, open, onOpenChange, onSubmit} = props;

    return <Dialog open={open} onOpenChange={onOpenChange}>
                    <DialogTrigger asChild>
                        <Button><Plus/>New List</Button>
                    </DialogTrigger>
                    <DialogContent showCloseButton={false}>
                        <form onSubmit={onSubmit}>
                            <DialogHeader>
                                <DialogTitle>New List</DialogTitle>
                            </DialogHeader>
                            <Input
                                    className="my-4"
                                    type="text"
                                    placeholder="Enter a new list name..."
                                    value={newListTitle}
                                    onChange={(e) => onNewListTitleChange(e.target.value)}
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