
import { sql } from '@vercel/postgres';

export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

export async function getProjects(type?: string | null): Promise<Project[]> {
    const { rows } = type
        ? await sql`SELECT * FROM projects WHERE type = ${type}`
        : await sql`SELECT * FROM projects`;

    return rows as Project[];
}

export async function getProjectById(id: number): Promise<Project | null> {
    const { rows } = await sql`SELECT * FROM projects WHERE id = ${id}`;

    return (rows[0] as Project) ?? null;
}
