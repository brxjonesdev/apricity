import { Database } from "@/lib/supabase/types";
import { Result, ok, err } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

type Image = Database['public']['Tables']['image']['Row'];
type ImageInsert = Database['public']['Tables']['image']['Insert'];
type ImageUpdate = Database['public']['Tables']['image']['Update'];

export interface ImageRepository {
  create(image: Omit<ImageInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Result<Image, string>>;
  update(id: number, updates: ImageUpdate): Promise<Result<Image, string>>;
  delete(id: number): Promise<Result<null, string>>;
}

export function createSupabaseImageRepo(): ImageRepository {
  const supabase = createClient();

  return {
    async create(image): Promise<Result<Image, string>> {
      const { data, error } = await supabase
        .from('image')
        .insert(image)
        .select()
        .single();
      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async update(id, updates): Promise<Result<Image, string>> {
      const { data, error } = await supabase
        .from('image')
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
        .from('image')
        .delete()
        .eq('id', id);

      if (error) {
        return err(error.message);
      }
      return ok(null);
    },
  }
}
