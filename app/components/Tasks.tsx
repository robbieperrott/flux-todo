"use client"
import { useOptimistic, useTransition } from "react";
import { createTask, deleteTask } from "../actions";
import { ListWithTasks } from "../types";
import DeleteListButton from "./DeleteListButton";
import NewTaskButton from "./NewTaskButton";
import TaskCard from "./TaskCard";
import UpdateListTitleButton from "./UpdateListTitleButton";
import { Task } from "../generated/prisma/browser";

interface TasksProps {
    list: ListWithTasks;
}

export default function Tasks(props: TasksProps) {
    const {list} = props;
    
    const [isPending, startTransition] = useTransition();
    
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

    const handleSubmitNewTask = async (description: string) => startTransition(async () => {
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

    const handleDelete = async (task: Task) => startTransition(async () => {
        setOptimisticTasks({
            action: "delete",
            task
        });
        await deleteTask(task.id, location.pathname)
    });

    const sortedTasks = optimisticTasks.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    return <><div className="flex justify-between mb-4">
        <div className="text-xl font-semibold my-auto">
          {list.title}
        </div>
        <div className="flex gap-4 items-center">
          <UpdateListTitleButton listId={list.id}/>
          <DeleteListButton listId={list.id}/>
          <NewTaskButton isPending={isPending} onSubmit={handleSubmitNewTask}/>
        </div>
      </div><div className="flex flex-col gap-4">
        {sortedTasks.map((task) => <TaskCard key={task.id} task={task} onDelete={() => handleDelete(task)}/>)}
      </div></>
}