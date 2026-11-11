import Link from "next/link";

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="max-w-5xl mx-auto px-6 py-6">
            <nav className="flex gap-8 border-b border-gray-200 mb-8 pb-4">
                <Link
                    href="/projects"
                    className="text-[#3B2A22] font-semibold hover:text-[#8B6B52] transition-colors"
                >
                    Overview
                </Link>

                <Link
                    href="/projects/settings"
                    className="text-[#3B2A22] font-semibold hover:text-[#8B6B52] transition-colors"
                >
                    Settings
                </Link>
            </nav>

            {children}
        </section>
    );
}