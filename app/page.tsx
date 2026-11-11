import ProjectList from "@/components/ProjectList";

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

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-5 text-[#3B2A22]">
          Welcome to My Portfolio
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
          Hello! I am a software development student learning to build web
          applications. Here are some of my projects.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#3B2A22] border-b border-gray-200 pb-3">
          My Projects
        </h2>

        <ProjectList projects={projects} />
      </section>
    </div>
  );
}