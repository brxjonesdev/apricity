import { ProjectsRepository } from "../repositories/projects.repo";
import { Database } from "../supabase/types";
import { err, ok, Result } from "../utils";

export type Project = Database["public"]["Tables"]["projects"]["Row"];

export function createProjectsService(projectsRepo: ProjectsRepository) {
  return {
    // --- Project Methods ---
    async createProject(data: {
      name: string;
      blurb?: string;
      user_id: string;
    }): Promise<Result<Project, string>> {
      if (!data.name || data.name.trim().length === 0) {
        return err("Project name is required");
      }
      if (data.name.length > 255) {
        return err("Project name cannot exceed 255 characters");
      }
      if (data.blurb && data.blurb.length > 500) {
        return err("Project blurb cannot exceed 500 characters");
      }
      if (!data.user_id) {
        return err("User ID is required");
      }

      const newProject = {
        name: data.name,
        blurb: data.blurb || "",
        user_id: data.user_id,
      };
      const projectCreationResult = await projectsRepo.create(newProject);
      if (!projectCreationResult.ok) {
        return err(`Failed to create project: ${projectCreationResult.error}`);
      }
      return ok(projectCreationResult.data);
    },

    async deleteProject(projectId: string): Promise<Result<null, string>> {
      if (!projectId) {
        return err("Project ID is required");
      }

      const existingProjectResult = await projectsRepo.getByID(projectId);
      if (!existingProjectResult.ok || !existingProjectResult.data) {
        return err("Project not found");
      }

      const deletionResult = await projectsRepo.delete(projectId);
      if (!deletionResult.ok) {
        return err(`Failed to delete project: ${deletionResult.error}`);
      }
      return ok(null);
    },

    async updateProject(
      projectID: string,
      updates: Partial<Omit<Project, "project_id" | "user_id">>,
    ) {
      if (!projectID) {
        return err("Project ID is required");
      }
      const existingProjectResult = await projectsRepo.getByID(projectID);
      if (!existingProjectResult.ok || !existingProjectResult.data) {
        return err("Project not found");
      }

      if (updates.name !== undefined) {
        if (updates.name.trim().length === 0) {
          return err("Project name cannot be empty");
        }
        if (updates.name.length > 255) {
          return err("Project name cannot exceed 255 characters");
        }
      }
      if ((updates.blurb?.length ?? 0) > 500) {
        return err("Project blurb cannot exceed 500 characters");
      }

      const updateResult = await projectsRepo.update(projectID, updates);
      if (!updateResult.ok) {
        return err(`Failed to update project: ${updateResult.error}`);
      }
      return ok(updateResult.data);
    },
    async getProjectsByUser(
      userID: string,
    ): Promise<Result<Project[], string>> {
      if (!userID) {
        return err("User ID is required");
      }

      const projectsResult = await projectsRepo.getAllByUser(userID);
      if (!projectsResult.ok) {
        return err(`Failed to fetch projects: ${projectsResult.error}`);
      }
      return ok(projectsResult.data);
    },
    async getById(projectID: string): Promise<Result<Project, string>> {
      if (!projectID) {
        return err("Project ID is required");
      }

      const projectResult = await projectsRepo.getByID(projectID);
      if (!projectResult.ok || !projectResult.data) {
        return err("Project not found");
      }
      return ok(projectResult.data);
    },
  };
}
