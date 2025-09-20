import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function PUT(
    request: NextRequest, context: { params: Promise<{ id: string; }>; })
{
    const { id } = await context.params;
    const { title } = await request.json();

    if (!title || typeof title !== 'string') {
    return new Response("Invalid or missing title", { status: 405 });
    }

    const updatedList = await prisma.list.update({
    where: { id: parseInt(id) },
    data: { title: title },
    });

    return new Response(JSON.stringify(updatedList), { status: 201 });
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string; }>; }) {
    const { id } = await context.params;

    const updatedList = await prisma.list.delete({
        where: { id: parseInt(id) }
    });

    return new Response(JSON.stringify(updatedList), { status: 201 });
}
