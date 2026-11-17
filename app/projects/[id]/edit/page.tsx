import { getProjectById } from "@/lib/projects-db";
import { updateProject } from "@/app/lib/actions";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
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

    const updateProjectWithId = updateProject.bind(null, id);

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6 text-[#3B2A22]">
                Edit Project
            </h1>

            <form action={updateProjectWithId} className="space-y-5">
                <div>
                    <label htmlFor="title" className="block mb-2 font-medium">
                        Project Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        defaultValue={project.title}
                        required
                        minLength={2}
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block mb-2 font-medium">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={project.description}
                        required
                        minLength={10}
                        rows={4}
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div>
                    <label htmlFor="technologies" className="block mb-2 font-medium">
                        Technologies (separated by commas)
                    </label>
                    <input
                        id="technologies"
                        name="technologies"
                        type="text"
                        defaultValue={project.technologies.join(", ")}
                        required
                        minLength={2}
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div>
                    <label htmlFor="type" className="block mb-2 font-medium">
                        Project Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        defaultValue={project.type}
                        required
                        className="w-full border rounded-lg p-3"
                    >
                        <option value="school">School</option>
                        <option value="opensource">Open Source</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="link" className="block mb-2 font-medium">
                        Project Link (optional)
                    </label>
                    <input
                        id="link"
                        name="link"
                        type="url"
                        defaultValue={project.link ?? ""}
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-[#3B2A22] text-white px-6 py-3 rounded-lg hover:opacity-90"
                >
                    Update Project
                </button>
            </form>
        </div>
    );
}
