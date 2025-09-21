"use client"

import { useOptimistic, useState, useTransition } from "react";
import { List, Task } from "../generated/prisma/browser";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { createList } from "../actions";
import { Input } from "@/components/ui/input";
import NewListButton from "./NewListButton";
import { SortBy, ListWithTasks, SortDirection } from "../types";
import SortMenu from "./SortMenu";

interface ListsProps {
    lists: ListWithTasks[];
    userId: number;
}

export default function Lists(props: ListsProps) {
    const {lists, userId} = props;

    const [isPending, startTransition] = useTransition();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<SortBy>("createdAt");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

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

     const handleSubmitNewList = async (newListTitle: string) => startTransition(async () => {
        addOptimisticList(newListTitle);
        await createList(newListTitle, location.pathname);
    });

    const fractionCompleteString = (tasks: Task[]) => tasks.length ? `${tasks.filter(task => task.complete).length} / ${tasks.length}` : '-';

    const listFilter = (list: ListWithTasks) => {
        return list.title.toLowerCase().includes(searchTerm.toLowerCase()) || list.tasks.find(task => task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    const filteredLists = optimisticLists.filter(listFilter);

    const sortFunction = () => {
        if (sortBy === "createdAt") {
            return (a: List, b: List) => {
                const [c,d] = sortDirection === "asc" ? [a,b] : [b,a];
                return c.createdAt.getTime() - d.createdAt.getTime()
            };
        } else if (sortBy === "text") {
            return (a: List, b: List) => {
                const [c,d] = sortDirection === "asc" ? [a,b] : [b,a];
                return c.title < d.title ? -1 : 1;
            };
        }
    }

    const sortedLists = filteredLists.sort(sortFunction());

    return <>
        <div className="flex flex-col gap-8">
            <div className="flex flex-row gap-4">
                <Input
                    type="text"
                    placeholder="Search for lists or tasks"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SortMenu
                    direction={sortDirection}
                    onChangeDirection={setSortDirection}
                    onChangeSortBy={setSortBy}
                    sortBy={sortBy}
                    textFieldName="Title"
                />
                <NewListButton
                    isPending={isPending}
                    onSubmit={handleSubmitNewList}
                />
            </div>
            <div className="flex flex-col gap-4">
            {sortedLists.map((list) => (
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
