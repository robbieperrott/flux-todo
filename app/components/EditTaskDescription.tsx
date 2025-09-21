import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";
import { useEffect, useState } from "react";

interface EditTaskDescriptionProps {
    initialDescription: string;
    onUpdate: (description: string) => Promise<void>;
}

export default function EditTaskDescription(props: EditTaskDescriptionProps) {
    const {initialDescription, onUpdate} = props;
    const [description, setDescription] = useState(initialDescription);
    const [open, setOpen] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.stopPropagation();
        setOpen(false);
        onUpdate(description);
    }

    useEffect(() => {
        // Revert to initial description when opening / closing modal
        setDescription(initialDescription);
    }, [open])

    return <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon">
                        <PenLine size={16}/>
                    </Button>
                </DialogTrigger>
                <DialogContent showCloseButton={false}>
                        <DialogHeader>
                            <DialogTitle>Edit Task</DialogTitle>
                        </DialogHeader>
                        <Input
                            className="my-4"
                            type="text"
                            placeholder="Describe your task here..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <DialogFooter>
                            <DialogClose asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleSubmit}>Save</Button>
                        </DialogFooter>
                </DialogContent>
            </Dialog>
}