import SkillCard from "@/components/SkillCard";

export default function About() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">About Me</h1>

            <p className="text-lg text-gray-600 mb-4">
                I am a software development student interested in creating useful
                web applications and learning new technologies.
            </p>

            <p className="text-lg text-gray-600 mb-8">
                I enjoy learning about web development, solving problems, and
                improving my programming skills.
            </p>

            <h2 className="text-2xl font-bold mb-4">My Skills</h2>

            <div className="grid gap-4 md:grid-cols-2">
                <SkillCard
                    title="Web Development"
                    description="Learning to build web applications using modern technologies."
                />

                <SkillCard
                    title="JavaScript"
                    description="Learning to create interactive and functional applications."
                />
            </div>
        </div>
    );
}