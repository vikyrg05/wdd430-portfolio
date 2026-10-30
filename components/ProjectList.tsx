import ProjectCard from "./ProjectCard";

const projects = [
    {
        title: "Movie Finder",
        description: "A web application to search for movies and save favorite titles.",
        technologies: ["HTML", "CSS", "JavaScript", "Vite"],
        link: "https://github.com/vikyrg05/movie-finder",
    },
    {
        title: "CSE 340 Project",
        description: "A web application built with Node.js, Express, and PostgreSQL.",
        technologies: ["Node.js", "Express", "PostgreSQL", "EJS"],
        link: "https://github.com/vikyrg05/cse340",
    },
];

export default function ProjectList() {
    return (
        <section className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
            ))}
        </section>
    );
}