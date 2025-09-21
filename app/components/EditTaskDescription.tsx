import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";
import { useState } from "react";
import { updateTask } from "../actions";

interface EditTaskDescriptionProps {
    taskId: number;
}

export default function EditTaskDescription(props: EditTaskDescriptionProps) {
    const {taskId} = props;
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.stopPropagation();
        await updateTask({id: taskId, description}, location.pathname);
        setOpen(false);
        setDescription("");
    }

    return <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <PenLine size={16}/>
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