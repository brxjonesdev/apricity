import { Database } from "@/lib/supabase/types";

type Project = Database['public']['Tables']['projects']['Row'];
type Manuscript = Database['public']['Tables']['manuscript']['Row'];
type Chapter = Database['public']['Tables']['chapter']['Row'];
type ChapterContent = Database['public']['Tables']['chapter_content']['Row'];
type Scene = Database['public']['Tables']['scene']['Row'];
type Image = Database['public']['Tables']['image']['Row'];
type ProjectData = Project & {
  manuscript: (Manuscript & {
    chapter: (Chapter & {
      chapter_content: (ChapterContent & {
        scene?: Scene | null;
        image?: Image | null;
      })[];
    })[];
  })[];
};

export default function WorkspaceWrapper({ initialProjectData }: { initialProjectData: ProjectData }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Workspace for {initialProjectData.name}</h1>
      {/* Render project details here */}
      <pre>{JSON.stringify(initialProjectData, null, 2)}</pre>
    </div>
  );
}
