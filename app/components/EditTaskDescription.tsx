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
        e.preventDefault();
        await updateTask({id: taskId, description}, location.pathname);
        setOpen(false);
    }

    return <Dialog open={open}>
                <DialogTrigger onClick={() => setOpen(true)} asChild>
                <PenLine size={20}/>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Change Task Name</DialogTitle>
                        </DialogHeader>
                        <Input
                            className="my-4"
                            type="text"
                            placeholder="Enter a new task name..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleSubmit}>Save</Button>
                        </DialogFooter>
                </DialogContent>
            </Dialog>
}