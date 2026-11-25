import CreateProjectForm from '@/app/projects/create/create-project-form';

export default function NewProjectPage() {
    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6 text-[#3B2A22]">
                Create New Project
            </h1>

            <CreateProjectForm />
        </div>
    );
}