import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Link from "next/link";
import NewListButton from "./components/NewListButton";
import { Card, CardContent } from "@/components/ui/card";

export default async function Home() {
  const user = await currentUser();
  if (!user) return <div className="flex justify-center">Sign in to manage your Todo lists</div>;

  const lists = await prisma.list.findMany({
    where: { user: { clerkId: user.id } },
  });

  return (
    <main>
      <div className="flex flex-col gap-4">
        {lists.map((list) => (
          <Link href={`/${list.id}`} key={list.id}>
            <Card className="p-3">
              <CardContent>
                <div className="">
                  {list.title}
                </div></CardContent>
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
