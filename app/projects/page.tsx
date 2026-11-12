
import { Suspense } from "react";
import {
    fetchFilteredProjects,
    fetchProjectsPages,
} from "@/lib/projects-db";
import ProjectSearch from "./ui/project-search";
import Pagination from "./ui/pagination";

export const dynamic = "force-dynamic";

export default async function ProjectsPage(props: {
    searchParams?: Promise<{ query?: string; page?: string }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";

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
                Projects Overview
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
                Explore my open source and school projects.
            </p>

            <Suspense fallback={<div className="mt-6 h-12" />}>
                <ProjectSearch />
            </Suspense>

            <div className="grid gap-6 mt-8 md:grid-cols-2">
                {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-6">
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
                            Technologies: {project.technologies.join(", ")}
                        </p>

                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline mt-3 inline-block"
                            >
                                View Project
                            </a>
                        )}
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
