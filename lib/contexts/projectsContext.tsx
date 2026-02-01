"use client";
import { ProjectData } from "@/app/nook/[projectID]/_components/workspace-wrapper";
import { ManuscriptProvider } from "./manuscript/index";
import { Database } from "../supabase/types";
import { createContext, useContext, useState, useTransition } from "react";
import {
  ManuscriptWithChapters,
  Project,
} from "../services/manuscript.service";
import {
  deleteProjectData,
  updateProjectData,
} from "../actions/project-actions";

interface ProjectFullData {
  project: Database["public"]["Tables"]["projects"]["Row"];
  manuscripts: ManuscriptWithChapters[];
  // plots: PlotData[];
  // characters: CharacterData[];
  // worldBuilding: WorldBuildingData[];
  // notes: NoteData[];
}

interface ProjectContextType {
  project: Database["public"]["Tables"]["projects"]["Row"];
  updateProject: (
    updates: Partial<Database["public"]["Tables"]["projects"]["Row"]>,
  ) => Promise<void>;
  deleteProject: () => Promise<void>;
  isPending: boolean;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({
  initialData,
  children,
}: {
  initialData: ProjectFullData;
  children: React.ReactNode;
}) {
  const [project, setProject] = useState<Project>(initialData.project);
  const [isPending, startTransition] = useTransition();

  const updateProject = async (
    updates: Partial<Database["public"]["Tables"]["projects"]["Row"]>,
  ) => {
    const snapshot = project;

    startTransition(() => {
      setProject((prev) => ({ ...prev, ...updates }));
    });

    const result = await updateProjectData(project.project_id, updates);
    console.log("updateProject result:", result);
    if (!result.ok) {
      setProject((prev) => ({
        ...prev,
        ...Object.fromEntries(
          Object.keys(updates).map((key) => [
            key,
            snapshot[key as keyof typeof snapshot],
          ]),
        ),
      }));
      console.error("Failed to update project:", result.error);
    }
  };

  const deleteProject = async () => {
    startTransition(() => {
      setProject((prev) => ({ ...prev }));
    });
    const result = await deleteProjectData(project.project_id);

    if (!result.ok) {
      console.error("Failed to delete project:", result.error);
    }
  };

  const value: ProjectContextType = {
    project,
    updateProject,
    deleteProject,
    isPending,
  };
  return (
    <ProjectContext.Provider value={value}>
      <ManuscriptProvider initialData={initialData.manuscripts}>
        {children}
      </ManuscriptProvider>
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
