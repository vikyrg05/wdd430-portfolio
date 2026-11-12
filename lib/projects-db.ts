
import { sql } from '@vercel/postgres';

export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

const ITEMS_PER_PAGE = 6;

function sanitizeSearchQuery(query: string): string {
    return query
        .replace(/[\u0000-\u001F\u007F]/g, '')
        .trim()
        .slice(0, 100)
        .replace(/[!%_]/g, '!$&');
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

export async function fetchFilteredProjects(
    query: string,
    currentPage: number
): Promise<Project[]> {
    const safeQuery = sanitizeSearchQuery(query);
    const offset = (Math.max(1, Math.floor(currentPage)) - 1) * ITEMS_PER_PAGE;

    const { rows } = safeQuery
        ? await sql`
            SELECT * FROM projects
            WHERE title ILIKE ${`%${safeQuery}%`} ESCAPE '!'
            OR description ILIKE ${`%${safeQuery}%`} ESCAPE '!'
            OR array_to_string(technologies, ' ') ILIKE ${`%${safeQuery}%`} ESCAPE '!'
            ORDER BY id
            LIMIT ${ITEMS_PER_PAGE}
            OFFSET ${offset}
        `
        : await sql`
            SELECT * FROM projects
            ORDER BY id
            LIMIT ${ITEMS_PER_PAGE}
            OFFSET ${offset}
        `;

    return rows as Project[];
}

export async function fetchProjectsPages(query: string): Promise<number> {
    const safeQuery = sanitizeSearchQuery(query);

    const { rows } = safeQuery
        ? await sql`
            SELECT COUNT(*) FROM projects
            WHERE title ILIKE ${`%${safeQuery}%`} ESCAPE '!'
            OR description ILIKE ${`%${safeQuery}%`} ESCAPE '!'
            OR array_to_string(technologies, ' ') ILIKE ${`%${safeQuery}%`} ESCAPE '!'
        `
        : await sql`SELECT COUNT(*) FROM projects`;

    const totalProjects = Number(rows[0].count);

    return Math.ceil(totalProjects / ITEMS_PER_PAGE);
}
