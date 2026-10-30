import { connection } from "next/server";

export default async function Footer() {
    await connection();

    return (
        <footer className="bg-gray-100 text-center p-4 mt-auto">
            <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} My Portfolio. All rights reserved.
            </p>
        </footer>
    );
}