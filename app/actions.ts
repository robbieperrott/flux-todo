'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { List, Task } from './generated/prisma/client';


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

type PartialListWithoutId = Partial<Omit<List, 'id'>>;
type ListUpdate = PartialListWithoutId & Pick<List, 'id'>;

export async function updateList(list: ListUpdate, pathname: string) {
    console.log(list)
    await prisma.list.update({
        where: {id: list.id},
        data: {
            ...list
        },
    });
    revalidatePath(pathname);
}

type PartialTaskWithoutId = Partial<Omit<Task, 'id'>>;
type TaskUpdate = PartialTaskWithoutId & Pick<Task, 'id'>;

export async function updateTask(task: TaskUpdate, pathname: string) {
    await prisma.task.update({
        where: {id: task.id},
        data: {
            ...task
        },
    });
    revalidatePath(pathname);
}

export async function deleteList(id: number, redirectPathname: string) {
    await prisma.list.delete({
        where: { id }
    });

    redirect(redirectPathname);
}

export async function deleteTask(id: number, pathname: string) {
    await prisma.task.delete({
        where: { id }
    });

    revalidatePath(pathname);
}