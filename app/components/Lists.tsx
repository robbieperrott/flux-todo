"use client";

import { startTransition, useOptimistic, useState } from "react";
import { List, Task } from "../generated/prisma/browser";
import { Card, CardContent } from "@/components/ui/card";
import { createList } from "../actions";
import { Input } from "@/components/ui/input";
import NewListButton from "./NewListButton";
import { SortBy, SortDirection, Filter, ListDisplay } from "../types";
import SortMenu from "./SortMenu";
import Link from "next/link";
import FilterMenu from "./FilterMenu";

interface ListsProps {
  lists: ListDisplay[];
  userId: number;
}

export default function Lists(props: ListsProps) {
  const { lists, userId } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [filter, setFilter] = useState<Filter | null>(null);

  const [optimisticLists, addOptimisticList] = useOptimistic<
    ListDisplay[],
    string
  >(lists, (state, newListTitle) => [
    ...state,
    {
      pending: true, // Mark this as a temporary / optimistically loaded object
      id: Date.now(), // Temporary optimistic ID
      userId,
      title: newListTitle,
      createdAt: new Date(),
      tasks: [],
    },
  ]);

  const handleSubmitNewList = async (newListTitle: string) =>
    startTransition(async () => {
      addOptimisticList(newListTitle);
      await createList(newListTitle, location.pathname);
    });

  const listPassesFilter = (list: ListDisplay) => {
    const allTasksComplete =
      list.tasks.length && list.tasks.every((task) => task.complete);
    if (filter === "complete") {
      return allTasksComplete;
    } else if (filter === "incomplete") {
      return !allTasksComplete;
    } else {
      return true;
    }
  };

  const listPassesSearch = (list: ListDisplay) => {
    return (
      list.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      list.tasks.find((task) =>
        task.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    );
  };

  const listFilter = (list: ListDisplay) => {
    return listPassesFilter(list) && listPassesSearch(list);
  };

  const filteredLists = optimisticLists.filter(listFilter);

  const sortFunction = () => {
    if (sortBy === "createdAt") {
      return (a: List, b: List) => {
        const [c, d] = sortDirection === "asc" ? [a, b] : [b, a];
        return c.createdAt.getTime() - d.createdAt.getTime();
      };
    } else if (sortBy === "text") {
      return (a: List, b: List) => {
        const [c, d] = sortDirection === "asc" ? [a, b] : [b, a];
        return c.title < d.title ? -1 : 1;
      };
    }
  };

  const sortedLists = filteredLists.sort(sortFunction());

  return (
    <>
      <div className="flex flex-col gap-8 mb-4">
        <Input
          type="text"
          placeholder="Search for lists or tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex justify-between">
          <NewListButton onSubmit={handleSubmitNewList} />
          <div className="flex gap-2">
            <FilterMenu filter={filter} onChangeFilter={setFilter} />
            <SortMenu
              direction={sortDirection}
              onChangeDirection={setSortDirection}
              sortBy={sortBy}
              onChangeSortBy={setSortBy}
              textFieldName="Title"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {sortedLists.map((list) => (
          <ListCard key={list.id} list={list} searchTerm={searchTerm} />
        ))}
      </div>
    </>
  );
}

interface ListCardProps {
  list: ListDisplay;
  searchTerm: string;
}

function ListCard(props: ListCardProps) {
  const { list, searchTerm } = props;

  const fractionCompleteString = (tasks: Task[]) =>
    tasks.length
      ? `${tasks.filter((task) => task.complete).length} / ${tasks.length}`
      : "-";

  const containsTasksString = () => {
    const tasks = list.tasks.filter((task) =>
      task.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    if (tasks.length) {
      return `(contains ${tasks.length === 1 ? "task" : "tasks"}: ${tasks.map((task) => task.description).join(", ")})`;
    } else {
      return "";
    }
  };

  return (
    <Link
      className={list.pending ? "pointer-events-none" : ""}
      href={`/${list.id}`}
    >
      <Card
        key={list.id}
        className={`py-4 px-6 hover:bg-secondary ${list.pending ? "text-muted-foreground" : ""}`}
      >
        <CardContent className="flex justify-between px-0">
          <div className="overflow-hidden">
            {list.title}
            {searchTerm && (
              <small className="text-muted pl-2">{containsTasksString()}</small>
            )}
          </div>
          <div className="pl-4">{fractionCompleteString(list.tasks)}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
