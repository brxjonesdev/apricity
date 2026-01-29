import { Database} from "@/lib/supabase/types";
import { Result, ok, err } from "@/lib/utils";
import { SupabaseClient } from "@supabase/supabase-js";


type Scene = Database['public']['Tables']['scene']['Row'];
type SceneInsert = Database['public']['Tables']['scene']['Insert'];
type SceneUpdate = Database['public']['Tables']['scene']['Update'];

export interface SceneRepository {
  create(scene: Omit<SceneInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Result<Scene, string>>;
  update(id: number, updates: SceneUpdate): Promise<Result<Scene, string>>;
  delete(id: number): Promise<Result<null, string>>;
  getById(id: number): Promise<Result<Scene, string>>;
}

export function createSupabaseSceneRepo(supabase: SupabaseClient): SceneRepository {


  return {
    async getById(id): Promise<Result<Scene, string>> {
      const { data, error } = await supabase
        .from('scene')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async create(scene): Promise<Result<Scene, string>> {
      const { data, error } = await supabase
        .from('scene')
        .insert(scene)
        .select()
        .single();
      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async update(id, updates): Promise<Result<Scene, string>> {
      const { data, error } = await supabase
        .from('scene')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async delete(id): Promise<Result<null, string>> {
      const { error } = await supabase
        .from('scene')
        .delete()
        .eq('id', id);

      if (error) {
        return err(error.message);
      }
      return ok(null);
    },
  }
}
