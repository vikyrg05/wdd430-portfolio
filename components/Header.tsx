import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() {
    return (
        <header className="bg-[#3B2A22] text-white py-4 shadow-md">
            <nav className="max-w-5xl mx-auto flex items-center justify-between px-6">
                <Link href="/" className="text-xl font-bold">
                    Virginia Rocha
                </Link>

                <div className="flex items-center gap-6">
                    <NavLinks />

                    <Link
                        href="/projects"
                        className="text-white hover:underline"
                    >
                        Projects
                    </Link>
                </div>
            </nav>
        </header>
    );
}