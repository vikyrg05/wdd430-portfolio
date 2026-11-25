import { Suspense } from 'react';
import Link from 'next/link';
import {
    fetchFilteredProjects,
    fetchProjectsPages,
} from '@/lib/projects-db';
import { deleteProject } from '@/app/lib/actions';
import ProjectSearch from '@/app/projects/ui/project-search';
import Pagination from '@/app/projects/ui/pagination';

export const dynamic = 'force-dynamic';

export default async function DashboardProjectsPage(props: {
    searchParams?: Promise<{ query?: string; page?: string }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const pageNumber = Number(searchParams?.page) || 1;
    const currentPage =
        Number.isInteger(pageNumber) && pageNumber > 0
            ? pageNumber
            : 1;

    const projects = await fetchFilteredProjects(query, currentPage);
    const totalPages = await fetchProjectsPages(query);

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-4 text-[#3B2A22]">
                Manage Projects
            </h1>

            <p className="text-lg text-gray-600">
                Create, edit, and delete your portfolio projects.
            </p>

            <Link
                href="/dashboard/projects/new"
                className="inline-block mt-6 bg-[#3B2A22] text-white px-6 py-3 rounded-lg hover:opacity-90"
            >
                New Project
            </Link>

            <Suspense fallback={<div className="mt-6 h-12" />}>
                <ProjectSearch />
            </Suspense>

            <div className="grid gap-6 mt-8 md:grid-cols-2">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="border rounded-lg p-6"
                    >
                        <h2 className="text-xl font-bold text-[#3B2A22] mb-2">
                            {project.title}
                        </h2>

                        <p className="text-gray-600 mb-3">
                            {project.description}
                        </p>

                        <p className="text-sm text-gray-500">
                            Type: {project.type}
                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                            Technologies: {project.technologies.join(', ')}
                        </p>

                        <div className="flex gap-4 mt-5">
                            <Link
                                href={`/dashboard/projects/${project.id}/edit`}
                                className="text-blue-600 hover:underline"
                            >
                                Edit
                            </Link>

                            <form
                                action={deleteProject.bind(
                                    null,
                                    String(project.id)
                                )}
                            >
                                <button
                                    type="submit"
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                ))}

                {projects.length === 0 && (
                    <p className="text-gray-600">
                        No projects found.
                    </p>
                )}
            </div>

            {totalPages > 1 && (
                <Suspense fallback={<div className="mt-8 h-10" />}>
                    <Pagination totalPages={totalPages} />
                </Suspense>
            )}
        </div>
    );
}