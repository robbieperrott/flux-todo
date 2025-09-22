"use client";
import { startTransition, useOptimistic, useState } from "react";
import { createTask, deleteTask, updateList, updateTask } from "../actions";
import {
  ListWithTasks,
  SortDirection,
  SortBy,
  Filter,
  TaskDisplay,
} from "../types";
import DeleteListButton from "./DeleteListButton";
import NewTaskButton from "./NewTaskButton";
import TaskCard from "./TaskCard";
import UpdateListTitleButton from "./UpdateListTitleButton";
import { Task } from "../generated/prisma/browser";
import SortMenu from "./SortMenu";
import FilterMenu from "./FilterMenu";

interface ListProps {
  list: ListWithTasks;
}

export default function List(props: ListProps) {
  const { list } = props;

  const [sortBy, setSortBy] = useState<SortBy>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [filter, setFilter] = useState<Filter | null>(null);

  const [optimisticListTitle, setOptimisticListTitle] = useOptimistic<
    string,
    string
  >(list.title, (currentTitle, newTitle) => {
    return newTitle;
  });

  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    list.tasks,
    (state, { action, task }: { action: string; task: TaskDisplay }) => {
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

  const handleCreateTask = async (description: string) =>
    startTransition(async () => {
      setOptimisticTasks({
        action: "create",
        task: {
          pending: true, // Mark as a temporary / optimistically loaded task
          id: Date.now(), // Temporary optimistic ID,
          description,
          createdAt: new Date(),
          listId: list.id,
          complete: false,
        },
      });
      await createTask(description, list.id, location.pathname);
    });

  const handleDeleteTask = async (task: Task) =>
    startTransition(async () => {
      setOptimisticTasks({
        action: "delete",
        task,
      });
      await deleteTask(task.id, location.pathname);
    });

  const handleUpdateTask = async (task: Task) =>
    startTransition(async () => {
      setOptimisticTasks({
        action: "update",
        task,
      });
      await updateTask(task, location.pathname);
    });

  const handleUpdateListTitle = async (newTitle: string) =>
    startTransition(async () => {
      setOptimisticListTitle(newTitle);
      await updateList({ id: list.id, title: newTitle }, location.pathname);
    });

  const sortFunction = () => {
    if (sortBy === "createdAt") {
      return (a: Task, b: Task) => {
        const [c, d] = sortDirection === "asc" ? [a, b] : [b, a];
        return c.createdAt.getTime() - d.createdAt.getTime();
      };
    } else if (sortBy === "text") {
      return (a: Task, b: Task) => {
        const [c, d] = sortDirection === "asc" ? [a, b] : [b, a];
        return c.description < d.description ? -1 : 1;
      };
    }
  };

  const filteredTasks = optimisticTasks.filter((task) => {
    if (filter === "complete") {
      return task.complete;
    } else if (filter === "incomplete") {
      return !task.complete;
    } else {
      return true;
    }
  });

  const sortedTasks = filteredTasks.sort(sortFunction());

  return (
    <>
      <div className="flex flex-col gap-8 mb-4">
        <div className="flex justify-between">
          <div className="text-xl font-semibold my-auto text-center">
            {optimisticListTitle}
            <UpdateListTitleButton
              initialTitle={list.title}
              onUpdate={handleUpdateListTitle}
            />
          </div>
          <div className="flex gap-2">
            <DeleteListButton listId={list.id} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <NewTaskButton onSubmit={handleCreateTask} />
          <div className="flex gap-2">
            <FilterMenu filter={filter} onChangeFilter={setFilter} />
            <SortMenu
              sortBy={sortBy}
              onChangeSortBy={setSortBy}
              direction={sortDirection}
              onChangeDirection={setSortDirection}
              textFieldName="Description"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => handleDeleteTask(task)}
            onUpdate={handleUpdateTask}
          />
        ))}
      </div>
    </>
  );
}
