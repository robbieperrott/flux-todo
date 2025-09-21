import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";
import { useState } from "react";

interface EditTaskDescriptionProps {
    taskId: number;
}

export default function EditTaskDescription(props: EditTaskDescriptionProps) {
    const {taskId} = props;
  const [description, setDescription] = useState("");

  async function updateTaskName(e: React.FormEvent) {
        e.preventDefault();
        if (!description) return;

        await fetch(`/api/tasks/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description }),
        });

        setDescription("");
        location.reload();
    }

  return <Dialog>
            <DialogTrigger asChild>
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
                        <Button onClick={updateTaskName}>Save</Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
}