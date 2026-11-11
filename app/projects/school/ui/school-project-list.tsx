
import { getProjects } from "@/lib/projects-db";

export default async function SchoolProjectList() {
    const projects = await getProjects("school");

    return (
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
    );
}
