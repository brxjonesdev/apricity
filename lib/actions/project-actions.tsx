"use server";

import { getServices } from "@/lib/services";
import { ok, err } from "../utils";
import { Database } from "@/lib/supabase/types";
import { revalidatePath } from "next/cache";

export async function updateProjectData(
  projectId: string,
  updates: Partial<Database["public"]["Tables"]["projects"]["Row"]>,
) {
  const { projectService } = await getServices();

  try {
    const result = await projectService.updateProject(projectId, updates);
    console.log("updateProjectData result:", result);
    console.log("Updates:", updates);

    if (!result.ok) {
      return err(result.error);
    }
    revalidatePath(`/nook/${projectId}`);
    revalidatePath(`/start`);
    return ok(result.data);
  } catch (e) {
    console.error("updateProjectData failed:", e);
    return err("Unexpected server error when updating project data.");
  }
}

export async function deleteProjectData(projectId: string) {
  const { projectService } = await getServices();

  try {
    const result = await projectService.deleteProject(projectId);

    if (!result.ok) {
      return err(result.error);
    }
    revalidatePath(`/start`);
    return ok(null);
  } catch (e) {
    console.error("deleteProjectData failed:", e);
    return err("Unexpected server error when deleting project.");
  }
}
