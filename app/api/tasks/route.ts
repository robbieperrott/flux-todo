import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return new Response("Unauthorized", { status: 401 });

  const { description, listId } = await req.json();

  const list = await prisma.task.create({
    data: {
      description,
      listId,
    },
  });

  return new Response(JSON.stringify(list), { status: 201 });
}
