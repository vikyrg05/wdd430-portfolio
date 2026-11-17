
'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ProjectFormSchema = z.object({
    title: z.string().trim().min(2),
    description: z.string().trim().min(10),
    technologies: z.string().trim().min(2),
    type: z.enum(['opensource', 'school']),
    link: z.union([z.string().url(), z.literal('')]),
});

function validateProject(formData: FormData) {
    const raw = {
        title: formData.get('title'),
        description: formData.get('description'),
        technologies: formData.get('technologies'),
        type: formData.get('type'),
        link: formData.get('link') ?? '',
    };

    const parsed = ProjectFormSchema.safeParse(raw);

    if (!parsed.success) {
        throw new Error('Invalid project input.');
    }

    return {
        ...parsed.data,
        technologies: parsed.data.technologies
            .split(',')
            .map((technology) => technology.trim())
            .filter(Boolean),
        link: parsed.data.link || null,
    };
}

export async function createProject(formData: FormData) {
    const project = validateProject(formData);

    await sql`
        INSERT INTO projects (title, description, type, technologies, link)
        VALUES (
            ${project.title},
            ${project.description},
            ${project.type},
            string_to_array(${project.technologies.join(',')}, ','),
            ${project.link}
        )
    `;

    revalidatePath('/projects');
    redirect('/projects');
}

export async function updateProject(id: string, formData: FormData) {
    const projectId = Number(id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
        throw new Error('Invalid project ID.');
    }

    const project = validateProject(formData);

    await sql`
        UPDATE projects
        SET
            title = ${project.title},
            description = ${project.description},
            type = ${project.type},
            technologies = string_to_array(${project.technologies.join(',')}, ','),
            link = ${project.link}
        WHERE id = ${projectId}
    `;

    revalidatePath('/projects');
    redirect('/projects');
}

export async function deleteProject(id: string, _formData: FormData) {
    const projectId = Number(id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
        throw new Error('Invalid project ID.');
    }

    await sql`
        DELETE FROM projects
        WHERE id = ${projectId}
    `;

    revalidatePath('/projects');
    redirect('/projects');
}
