import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return new Response("Unauthorized", { status: 401 });

  const { title } = await req.json();

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) return new Response("User not found", { status: 404 });

  const list = await prisma.list.create({
    data: {
      title,
      userId: user.id,
    },
  });

  return new Response(JSON.stringify(list), { status: 201 });
}
