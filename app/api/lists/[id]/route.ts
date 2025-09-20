import prisma from "@/lib/prisma";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
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

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    const updatedList = await prisma.list.delete({
        where: { id: parseInt(id) }
    });

    return new Response(JSON.stringify(updatedList), { status: 201 });
}
