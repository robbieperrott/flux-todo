"use client"

import { startTransition, useOptimistic, useState } from "react";
import { List, Task } from "../generated/prisma/browser";
import { Card, CardContent } from "@/components/ui/card";
import { createList } from "../actions";
import { Input } from "@/components/ui/input";
import NewListButton from "./NewListButton";
import { SortBy, ListWithTasks, SortDirection, Filter } from "../types";
import ControlMenu from "./ControlMenu";
import { useRouter } from "next/navigation";

type ListDisplay = ListWithTasks & {pending?: boolean}

interface ListsProps {
    lists: ListDisplay[];
    userId: number;
}

export default function Lists(props: ListsProps) {
    const {lists, userId} = props;

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<SortBy>("createdAt");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
    const [filter, setFilter] = useState<Filter | null>(null);

    const [optimisticLists, addOptimisticList] = useOptimistic<
        ListDisplay[],
        string
    >(
        lists,
        (state, newListTitle) => [...state, {
            pending: true,   // Mark this as a temporary / optimistically loaded object
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

    const listPassesFilter = (list: ListDisplay) => {
        const allTasksComplete = list.tasks.length && list.tasks.every(task => task.complete);
        if (filter === "complete") {
            return allTasksComplete
        } else if (filter === "incomplete") {
            return !allTasksComplete
        } else {
            return true;
        }
    }

    const listPassesSearch = (list: ListDisplay) => {
        return list.title.toLowerCase().includes(searchTerm.toLowerCase()) || list.tasks.find(task => task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    const listFilter = (list: ListDisplay) => {
        return listPassesFilter(list) && listPassesSearch(list)
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

    const handleListClick = (list: ListDisplay) => {
        if (!list.pending) router.push(`/${list.id}`);
    }

    return <>
        <div className="flex flex-col gap-8">
            <div className="flex flex-row gap-4">
                <Input
                    type="text"
                    placeholder="Search for lists or tasks"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ControlMenu
                    direction={sortDirection}
                    onChangeDirection={setSortDirection}
                    sortBy={sortBy}
                    onChangeSortBy={setSortBy}
                    filter={filter}
                    onChangeFilter={setFilter}
                    textFieldName="Title"
                />
                <NewListButton
                    onSubmit={handleSubmitNewList}
                />
            </div>
            <div className="flex flex-col gap-4">
            {sortedLists.map((list) => (
                <Card key={list.id} onClick={() => handleListClick(list)} className="py-4 px-6">
                    <CardContent className="flex justify-between px-0">
                        <div className="overflow-hidden">{list.title}</div>
                        <div className="pl-4">{fractionCompleteString(list.tasks)}</div>
                    </CardContent>
                </Card>
            ))}
            </div>
        </div>
        </>
}
