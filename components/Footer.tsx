import { connection } from "next/server";

export default async function Footer() {
    await connection();

    return (
        <footer className="bg-[#3B2A22] text-center p-4 mt-auto">
            <p className="text-sm text-gray-200">
                © {new Date().getFullYear()} My Portfolio. All rights reserved.
            </p>
        </footer>
    );
}