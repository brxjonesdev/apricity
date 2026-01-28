import { Database } from "@/lib/supabase/types";
import { Result, ok, err } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { nanoid } from "nanoid";
import { Nanum_Gothic_Coding } from "next/font/google";

type User = Database['public']['Tables']['user']['Row'];
type UserInsert = Database['public']['Tables']['user']['Insert'];
type UserUpdate = Database['public']['Tables']['user']['Update'];

export interface UserRepository {
  create(user: Omit<UserInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Result<User, string>>;
  update(id: string, updates: UserUpdate): Promise<Result<User, string>>;
  delete(id: string): Promise<Result<null, string>>;
  getById(id: string): Promise<Result<User, string>>;
}

export function createSupabaseUserRepo(): UserRepository {
  const supabase = createClient();

  return {
    async create(user): Promise<Result<User, string>> {
      const { data, error } = await supabase
        .from('user')
        .insert({
          id: `user_${nanoid(15)}`,
          ...user,
        })
        .select()
        .single();
      if (error) {
        return err(error.message);
      }
      return ok(data);

    },
    async update(id, updates): Promise<Result<User, string>> {
      const { data, error } = await supabase
        .from('user')
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
        .from('user')
        .delete()
        .eq('id', id);

      if (error) {
        return err(error.message);
      }
      return ok(null);
    },
    async getById(id): Promise<Result<User, string>> {
      const { data, error } = await supabase
        .from('user')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
  }
}
