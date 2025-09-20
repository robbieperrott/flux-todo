import prisma from "@/lib/prisma";


export default async function ListPage({
  params,
}: {
  params: { id: string }
}) {
    const { id } = await params;

    const list = await prisma.list.findUnique({where: {id: parseInt(id)}, include: { tasks: true }})

    return <div>
        {list?.title}
        <ul>
            {list?.tasks.map((task) => <li key={task.id}>
                {task.description}
            </li>)}
        </ul>
        
    </div>
}