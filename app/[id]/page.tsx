import prisma from "@/lib/prisma";
import List from "../components/List";

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

    return <List list={list}/>
}
