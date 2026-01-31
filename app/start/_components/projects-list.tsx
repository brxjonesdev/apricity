import { getServices } from "@/lib/services";
export async function ProjectsList({ userId }: { userId: string }) {
  const { manuscriptService } = await getServices();
  const projectsData = await manuscriptService.getProjectsByUser(userId);
  if (!projectsData.ok) {
    return <div>Error loading projects: {projectsData.error}</div>;
  }
  const projects = projectsData.data;
  console.log("Projects:", projects);
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found. Start by creating a new project!</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project.project_id}
              className="p-4 border rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="text-gray-600">{project.blurb}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
