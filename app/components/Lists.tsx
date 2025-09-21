"use client"

import { useOptimistic, useState, useTransition } from "react";
import { List, Task } from "../generated/prisma/browser";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { createList } from "../actions";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

type ListWithTasks = List & {tasks: Task[]}

interface ListsProps {
    lists: ListWithTasks[];
    userId: number;
}

export default function Lists(props: ListsProps) {
    const {lists, userId} = props;

    const [newListTitle, setNewListTitle] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [searchTerm, setSearchTerm] = useState("");

    const [optimisticLists, addOptimisticList] = useOptimistic<
        ListWithTasks[],
        string
    >(
        lists,
        (state, newListTitle) => [...state, {
            id: Date.now(), // Temporary optimistic ID
            userId,
            title: newListTitle,
            createdAt: new Date(),
            tasks: [],
        }]
    )

    const listFilter = (list: ListWithTasks) => {
        return list.title.toLowerCase().includes(searchTerm.toLowerCase()) || list.tasks.find(task => task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    const filteredLists = optimisticLists.filter(listFilter)

     const handleSubmit = (e: React.FormEvent) => startTransition(async () => {
        setNewListTitle("");
        setDialogOpen(false);
        e.preventDefault();
        addOptimisticList(newListTitle);
        await createList(newListTitle, location.pathname);
    });

    const fractionCompleteString = (tasks: Task[]) => tasks.length ? `${tasks.filter(task => task.complete).length} / ${tasks.length}` : '-'

    return <>
        <div className="flex flex-col gap-8">
            <div className="flex flex-row gap-4">
                <Input
                    type="text"
                    placeholder="Search for lists or tasks"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
            </div>
            <div className="flex flex-col gap-4">
            {filteredLists.map((list) => (
            <Link href={`/${list.id}`} key={list.id}>
                <Card className="py-4 px-6">
                <CardContent className="flex justify-between px-0">
                    <div className="overflow-hidden">{list.title}</div>
                    <div className="pl-4">{fractionCompleteString(list.tasks)}</div>
                </CardContent>
                </Card>
            </Link>
            ))}
            </div>
        </div>
        </>
}
