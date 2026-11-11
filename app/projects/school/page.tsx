
import { Suspense } from "react";
import SchoolProjectList from "./ui/school-project-list";

export default function SchoolProjectsPage() {
    return (
        <div className="py-6">
            <h1 className="text-4xl font-bold mb-4 text-[#3B2A22]">
                School Projects
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
                Explore my school projects.
            </p>

            <Suspense
                fallback={
                    <div className="grid gap-6 mt-8 md:grid-cols-2 animate-pulse">
                        <div className="h-40 rounded-lg bg-slate-200" />
                        <div className="h-40 rounded-lg bg-slate-200" />
                    </div>
                }
            >
                <SchoolProjectList />
            </Suspense>
        </div>
    );
}
