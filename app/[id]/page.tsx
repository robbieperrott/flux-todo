import prisma from "@/lib/prisma";
import List from "../components/List";
import { currentUser } from "@clerk/nextjs/server";

export default async function ListPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const user = await currentUser();
  if (!user)
    return (
      <div className="flex justify-center">
        Sign in or sign up to manage your todo tasks.
      </div>
    );

  const list = await prisma.list.findUnique({
    where: { id: parseInt(id) },
    include: { tasks: true },
  });

  if (!list) {
    throw new Error("No list found");
  }

  return <List list={list} />;
}
