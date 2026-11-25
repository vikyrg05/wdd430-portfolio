
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Find contact information for Virginia Rocha and learn how to get in touch about her software development portfolio and projects.",
};

export default function ContactPage() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-4 text-[#3B2A22]">
                Contact Me
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
                Thank you for visiting my portfolio. This page is for contact information.
            </p>
        </div>
    );
}
