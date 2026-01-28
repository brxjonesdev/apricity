import { Database, Tables } from "@/lib/supabase/types";
import { Result, ok, err } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

type Scene = Database['public']['Tables']['scene']['Row'];
type SceneInsert = Database['public']['Tables']['scene']['Insert'];
type SceneUpdate = Database['public']['Tables']['scene']['Update'];

export interface SceneRepository {
  create(scene: Omit<SceneInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Result<Scene, string>>;
  update(id: number, updates: SceneUpdate): Promise<Result<Scene, string>>;
  delete(id: number): Promise<Result<null, string>>;
}

export function createSupabaseSceneRepo(): SceneRepository {
  const supabase = createClient();

  return {
    async create(scene): Promise<Result<Scene, string>> {
      return err("Not implemented");
    },
    async update(id, updates): Promise<Result<Scene, string>> {
      return err("Not implemented");
    },
    async delete(id): Promise<Result<null, string>> {
      return err("Not implemented");
    },
  }
}
