import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import UpdateListTitleButton from "../components/UpdateListTitleButton";
import DeleteListButton from "../components/DeleteListButton";
import NewTaskButton from "../components/NewTaskButton";

export default async function ListPage({
  params,
}: {
  params: { id: string }
}) {
    const { id } = await params;

    const list = await prisma.list.findUnique({where: {id: parseInt(id)}, include: { tasks: true }})

    if (!list) {
      throw new Error("No list found");
    }

    return <div>
      <div className="flex justify-between mb-4">
        <div className="text-xl font-semibold my-auto">
          {list.title}
        </div>
        <div className="flex gap-4 items-center">
          <UpdateListTitleButton listId={list.id}/>
          <DeleteListButton listId={list.id}/>
          <NewTaskButton listId={list.id}/>
        </div>
      </div>
        
      <div className="flex flex-col gap-4">
        {list.tasks.map((task) => <TaskCard key={task.id} description={task.description} />)}
      </div>
    </div>
}

interface TaskCardProps {
  description: string;
}

function TaskCard(props: TaskCardProps) {
  const {description} = props;

  return <Card className="p-3">
    <CardContent>{description}</CardContent>
  </Card>
}