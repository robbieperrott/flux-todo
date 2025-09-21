import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Lists from "./components/Lists";

export default async function ListsPage() {
  const user = await currentUser();
  if (!user) return <div className="flex justify-center">Sign in to manage your todo lists.</div>;

  const lists = await prisma.list.findMany({
    where: { user: { clerkId: user.id } },
    include: {tasks: true},
    orderBy: [{createdAt: "asc"}]
  });

  return (
    <main>
      <Lists lists={lists} userId={parseInt(user.id)}/>
    </main>
  );
}
