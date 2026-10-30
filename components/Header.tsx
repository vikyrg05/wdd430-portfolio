import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-blue-900 text-white p-4">
            <nav className="max-w-5xl mx-auto flex gap-6">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
            </nav>
        </header>
    );
}