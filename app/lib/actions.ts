
'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
    errors?: {
        title?: string[];
        description?: string[];
        technologies?: string[];
        yearCompleted?: string[];
        type?: string[];
        link?: string[];
    };
    message?: string | null;
};

const currentYear = new Date().getFullYear();

const CreateProjectSchema = z.object({
    title: z.string().trim().min(2, 'Title must contain at least 2 characters.'),
    description: z.string().trim().min(10, 'Description must contain at least 10 characters.'),
    technologies: z.string().trim().min(2, 'Please enter at least one technology.'),
    yearCompleted: z
        .string()
        .trim()
        .min(1, 'Please enter the year completed.')
        .transform(Number)
        .pipe(
            z.number()
                .int('Year must be a whole number.')
                .min(2000, 'Year must be 2000 or later.')
                .max(currentYear, `Year cannot be later than ${currentYear}.`)
        ),
    type: z.enum(['opensource', 'school']),
    link: z.union([z.string().url('Please enter a valid URL.'), z.literal('')]),
});

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

export async function createProject(
    prevState: State,
    formData: FormData
): Promise<State> {
    const validatedFields = CreateProjectSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        technologies: formData.get('technologies'),
        yearCompleted: formData.get('yearCompleted'),
        type: formData.get('type'),
        link: formData.get('link') ?? '',
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Project.',
        };
    }

    const project = validatedFields.data;

    const technologies = project.technologies
        .split(',')
        .map((technology) => technology.trim())
        .filter(Boolean);

    try {
        await sql`
            INSERT INTO projects (
                title,
                description,
                type,
                technologies,
                link,
                year_completed
            )
            VALUES (
                ${project.title},
                ${project.description},
                ${project.type},
                string_to_array(${technologies.join(',')}, ','),
                ${project.link || null},
                ${project.yearCompleted}
            )
        `;
    } catch (error) {
        console.error('Error creating project:', error);

        return {
            message: 'Database Error: Failed to Create Project.',
        };
    }

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
