import { createClient } from "../supabase/client";
import { Database } from "../supabase/types";
import { Result, ok, err } from "../utils";

export type User = Database['public']['Tables']['user']['Row'];
export type UserInsert = Database['public']['Tables']['user']['Insert'];
export type UserUpdate = Database['public']['Tables']['user']['Update'];

export interface UserRepository {
  create(user: Omit<UserInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Result<User, string>>;
  update(id: number, updates: UserUpdate): Promise<Result<User, string>>;
  delete(id: number): Promise<Result<null, string>>;
  getById(authID: number): Promise<Result<User, string>>;
  getByUsername(username: string): Promise<Result<User, string>>;
}

export function createSupabaseUserRepo(): UserRepository {
  const supabase = createClient();

  return {
    async create(user): Promise<Result<User, string>> {
      const { data, error } = await supabase
        .from('user')
        .insert(user)
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
    async getById(userID): Promise<Result<User, string>> {
      const { data, error } = await supabase
        .from('user')
        .select()
        .eq('user_id', userID)
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async getByUsername(username): Promise<Result<User, string>> {
      const { data, error } = await supabase
        .from('user')
        .select()
        .eq('username', username)
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
  }
}
