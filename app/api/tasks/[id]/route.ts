import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function PUT(
    request: NextRequest, context: { params: Promise<{ id: string; }>; })
{
    const { id } = await context.params;
    const { complete } = await request.json();

    const updatedTask = await prisma.task.update({
        where: { id: parseInt(id) },
        data: { complete },
    });

    return new Response(JSON.stringify(updatedTask), { status: 201 });
}