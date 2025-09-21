'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function createList(title: string, pathname: string) {
    const { userId: clerkId } = await auth();
    if (!clerkId) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
        where: { clerkId },
    });

    if (!user) throw new Error("User not found");

    await prisma.list.create({
        data: {
        title,
        userId: user.id,
        },
    });
    revalidatePath(pathname);
}

export async function createTask(description: string, listId: number, pathname: string) {
    await prisma.task.create({
        data: {
        description,
        listId,
        },
    });
    revalidatePath(pathname);
}

export async function deleteList(listId: number, redirectPathname: string) {
    await prisma.list.delete({
        where: { id: listId }
    });

    redirect(redirectPathname);
}