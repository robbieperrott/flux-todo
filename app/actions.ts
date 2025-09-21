'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';


export async function createList(title: string, pathname: string) {
const { userId: clerkId } = await auth();
  if (!clerkId) return new Response("Unauthorized", { status: 401 });

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) return new Response("User not found", { status: 404 });

  await prisma.list.create({
    data: {
      title,
      userId: user.id,
    },
  });
   revalidatePath(pathname)
}