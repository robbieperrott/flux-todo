import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Link from "next/link";
import NewListButton from "./components/NewListButton";
import { Card, CardContent } from "@/components/ui/card";
import { Task } from "./generated/prisma/client";

export default async function ListsPage() {
  const user = await currentUser();
  if (!user) return <div className="flex justify-center">Sign in to manage your Todo lists</div>;

  const lists = await prisma.list.findMany({
    where: { user: { clerkId: user.id } },
    include: {tasks: true}
  });

  const fractionCompleteString = (tasks: Task[]) => tasks.length ? `${tasks.filter(task => task.complete).length}/${tasks.length}` : '-'

  return (
    <main>
      <div className="flex flex-col gap-4">
        {lists.map((list) => (
          <Link href={`/${list.id}`} key={list.id}>
            <Card className="p-3">
              <CardContent className="flex justify-between">
                  {list.title}
                  <div>{fractionCompleteString(list.tasks)}</div>
                </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <NewListButton/>
      </div>
    </main>
  );
}
