import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects-db';

export default async function ProjectDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const projectId = Number(id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
        notFound();
    }

    const project = await getProjectById(projectId);

    if (!project) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <Link
                href="/projects"
                className="text-[#3B2A22] hover:underline"
            >
                ← Back to Projects
            </Link>

            <h1 className="text-4xl font-bold mt-8 mb-4 text-[#3B2A22]">
                {project.title}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
                {project.description}
            </p>

            <div className="mt-8 space-y-4">
                <p className="text-gray-600">
                    <strong>Type:</strong> {project.type}
                </p>

                <p className="text-gray-600">
                    <strong>Technologies:</strong>{' '}
                    {project.technologies.join(', ')}
                </p>

                {project.year_completed && (
                    <p className="text-gray-600">
                        <strong>Year Completed:</strong>{' '}
                        {project.year_completed}
                    </p>
                )}

                {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-blue-600 hover:underline"
                    >
                        View Project
                    </a>
                )}
            </div>
        </div>
    );
}
