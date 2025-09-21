import { Task } from "../generated/prisma/browser";
import TaskCard from "./TaskCard";

interface TasksProps {
    tasks: Task[];
}

export default function Tasks(props: TasksProps) {
    const {tasks} = props;
    
    const sortedTasks = tasks.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    return <div className="flex flex-col gap-4">
        {sortedTasks.map((task) => <TaskCard key={task.id} task={task}/>)}
      </div>
}