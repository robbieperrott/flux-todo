"use client"
import { createTask } from "../actions";
import { ListWithTasks } from "../types";
import DeleteListButton from "./DeleteListButton";
import NewTaskButton from "./NewTaskButton";
import TaskCard from "./TaskCard";
import UpdateListTitleButton from "./UpdateListTitleButton";

interface TasksProps {
    list: ListWithTasks;
}

export default function Tasks(props: TasksProps) {
    const {list} = props;
    
    const sortedTasks = list.tasks.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    const handleSubmitNewTask = async (description: string) => {
        await createTask(description, list.id, location.pathname);
    }

    return <><div className="flex justify-between mb-4">
        <div className="text-xl font-semibold my-auto">
          {list.title}
        </div>
        <div className="flex gap-4 items-center">
          <UpdateListTitleButton listId={list.id}/>
          <DeleteListButton listId={list.id}/>
          <NewTaskButton isPending={false} onSubmit={handleSubmitNewTask}/>
        </div>
      </div><div className="flex flex-col gap-4">
        {sortedTasks.map((task) => <TaskCard key={task.id} task={task}/>)}
      </div></>
}