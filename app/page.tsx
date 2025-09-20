import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import ListInputs from "@/app/components/ListInputs";

export default async function Home() {
  const user = await currentUser();
  if (!user) return <div className="flex justify-center">Sign in to manage your Todo lists</div>;

  const lists = await prisma.list.findMany({
    where: { user: { clerkId: user.id } },
  });

  return (
    <main className="max-w-2xl mx-auto p-4">
      <ListInputs />
      <div className="mt-8">
        {lists.map((list) => (
          <div
            key={list.id}
            className="p-4 border border-zinc-800 rounded mt-4">
            <h2 className="font-bold">{list.title}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}