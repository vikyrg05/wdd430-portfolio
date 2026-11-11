import { NextResponse } from 'next/server';
import { getProjectById } from '@/lib/projects-db';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: projectId } = await params;
    const id = Number(projectId);

    if (!Number.isInteger(id) || id <= 0) {
        return NextResponse.json(
            { error: 'Invalid id' },
            { status: 400 }
        );
    }

    const project = await getProjectById(id);

    if (!project) {
        return NextResponse.json(
            { error: 'Project not found' },
            { status: 404 }
        );
    }

    return NextResponse.json(project);
}