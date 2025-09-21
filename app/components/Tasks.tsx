"use client"
import { useOptimistic, useTransition } from "react";
import { createTask } from "../actions";
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
    
    const [optimisticTasks, addOptimisticTask] = useOptimistic<
        Task[],
        string
    >(
        list.tasks,
        (currentTasks, newTaskDescription) => [...currentTasks, {
            id: Date.now(), // Temporary optimistic ID,
            description: newTaskDescription,
            createdAt: new Date(),
            listId: list.id,
            complete: false,
        }]
    )

    const handleSubmitNewTask = async (description: string) => startTransition(async () => {
        addOptimisticTask(description);
        await createTask(description, list.id, location.pathname);
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
        {sortedTasks.map((task) => <TaskCard key={task.id} task={task}/>)}
      </div></>
}