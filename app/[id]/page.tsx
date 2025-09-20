import prisma from "@/lib/prisma";
import { Task } from "../generated/prisma/client";
import { Card, CardContent } from "@/components/ui/card";


export default async function ListPage({
  params,
}: {
  params: { id: string }
}) {
    const { id } = await params;

    const list = await prisma.list.findUnique({where: {id: parseInt(id)}, include: { tasks: true }})

    return <div>
        <div className="text-xl mb-4">
          {list?.title}
          </div>
          <div className="flex flex-col gap-4">
            {list?.tasks.map((task) => <TaskCard key={task.id} description={task.description} />)}
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