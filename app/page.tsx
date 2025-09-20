import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Link from "next/link";
import ListInputs from "./components/ListInputs";

export default async function Home() {
  const user = await currentUser();
  if (!user) return <div className="flex justify-center">Sign in to manage your Todo lists</div>;

  const lists = await prisma.list.findMany({
    where: { user: { clerkId: user.id } },
  });

  return (
    <main>
        <ListInputs/>
        {lists.map((list) => (
          <Link href={`/${list.id}`} key={list.id}>
            <div
              className="p-4 border border-zinc-800 rounded mt-4">
              <h2 className="font-bold">{list.title}</h2>
            </div>
          </Link>
        ))}
    </main>
  );
}