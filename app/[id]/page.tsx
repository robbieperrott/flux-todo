import prisma from "@/lib/prisma";


export default async function ListPage({
  params,
}: {
  params: { id: string }
}) {
    const id = parseInt(params.id);

    const list = await prisma.list.findUnique({where: {id}})

    return <p>
        {list?.title}
    </p>
}