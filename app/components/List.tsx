"use client"
import { startTransition, useOptimistic, useState } from "react";
import { createTask, deleteTask, updateList, updateTask } from "../actions";
import { ListWithTasks, SortDirection, TaskSortBy } from "../types";
import DeleteListButton from "./DeleteListButton";
import NewTaskButton from "./NewTaskButton";
import TaskCard from "./TaskCard";
import UpdateListTitleButton from "./UpdateListTitleButton";
import { Task } from "../generated/prisma/browser";
import TaskSortMenu from "./TaskSortMenu";

interface ListProps {
    list: ListWithTasks;
}

export default function List(props: ListProps) {
    const {list} = props;

    const [sortBy, setSortBy] = useState<TaskSortBy>("createdAt");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");


    const [optimisticListTitle, setOptimisticListTitle] = useOptimistic<string, string>(
        list.title,
        (currentTitle, newTitle) => {
            return newTitle
        }
    )
    
    const [optimisticTasks, setOptimisticTasks] = useOptimistic(
        list.tasks,
        (state, { action, task }: { action: string; task: Task }) => {
            switch (action) {
            case "delete":
                return state.filter(({ id }) => id !== task.id);
            case "update":
                return state.map((t) => (t.id === task.id ? task : t));
            default:
                return [...state, task];
            }
        },
    );

    const handleCreateTask = async (description: string) => startTransition(async () => {
        setOptimisticTasks({
            action: "create",
            task: {
                id: Date.now(), // Temporary optimistic ID,
                description,
                createdAt: new Date(),
                listId: list.id,
                complete: false,
            }
        });
        await createTask(description, list.id, location.pathname);
    });

    const handleDeleteTask = async (task: Task) => startTransition(async () => {
        setOptimisticTasks({
            action: "delete",
            task
        });
        await deleteTask(task.id, location.pathname)
    });

    const handleUpdateTask = async (task: Task) => startTransition(async () => {
        setOptimisticTasks({
            action: "update",
            task
        });
        await updateTask(task, location.pathname)
    });

    const handleUpdateListTitle = async (newTitle: string) => startTransition(async () => {
        setOptimisticListTitle(newTitle);
        await updateList({id: list.id, title: newTitle}, location.pathname)
    });

    const sortFunction = () => {
        if (sortBy === "createdAt") {
            return (a: Task, b: Task) => {
                const [c,d] = sortDirection === "asc" ? [a,b] : [b,a];
                return c.createdAt.getTime() - d.createdAt.getTime()
            };
        } else if (sortBy === "description") {
            return (a: Task, b: Task) => {
                const [c,d] = sortDirection === "asc" ? [a,b] : [b,a];
                return c.description < d.description ? -1 : 1;
            };
        }
    }

    const sortedTasks = optimisticTasks.sort(sortFunction());

    return <>
        <div className="flex justify-between mb-4">
            <div className="text-xl font-semibold my-auto">
                {optimisticListTitle}
            </div>
            <div className="flex gap-2 items-center">
                <UpdateListTitleButton initialTitle={list.title} onUpdate={handleUpdateListTitle}/>
                <DeleteListButton listId={list.id}/>
                <TaskSortMenu sortBy={sortBy} onChangeSortBy={setSortBy} direction={sortDirection} onChangeDirection={setSortDirection} />
                <NewTaskButton onSubmit={handleCreateTask}/>
            </div>
            </div>
            <div className="flex flex-col gap-4">
                {sortedTasks.map((task) => <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={() => handleDeleteTask(task)}
                    onUpdate={handleUpdateTask}
                />)}
        </div>
    </>
}