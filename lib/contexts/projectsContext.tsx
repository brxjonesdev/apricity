"use client";
import { ProjectData } from "@/app/nook/[projectID]/_components/workspace-wrapper";
import { ManuscriptProvider } from "./manuscript/index";
import { Database } from "../supabase/types";
import { createContext, useContext, useState, useTransition } from "react";
import {
  ManuscriptWithChapters,
  Project,
} from "../services/manuscript.service";

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
    startTransition(async () => {
      // call server action to update project
    });
  };

  const deleteProject = async () => {
    startTransition(async () => {
      // call server action to delete project
    });
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
