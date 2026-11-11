"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects-db";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        async function fetchProjects() {
            const response = await fetch("/api/projects");
            const data = await response.json();
            setProjects(data);
        }

        fetchProjects();
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-4 text-[#3B2A22]">
                Projects Overview
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
                Explore my open source and school projects.
            </p>

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
            </div>
        </div>
    );
}