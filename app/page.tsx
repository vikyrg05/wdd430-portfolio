import ProjectList from "@/components/ProjectList";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <section className="mb-10">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg text-gray-600">
          Hello! I am a software development student learning to build web
          applications. Here are some of my projects.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">My Projects</h2>
        <ProjectList />
      </section>
    </div>
  );
}