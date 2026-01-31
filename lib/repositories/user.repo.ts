import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { Result, ok, err } from "../utils";

export type User = Database["public"]["Tables"]["profile"]["Row"];
export type UserInsert = Database["public"]["Tables"]["profile"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["profile"]["Update"];

export interface UserRepository {
  create(
    user: Omit<UserInsert, "id" | "created_at" | "updated_at">,
  ): Promise<Result<User, string>>;
  update(id: string, updates: UserUpdate): Promise<Result<User, string>>;
  delete(id: string): Promise<Result<null, string>>;
  getById(authID: string): Promise<Result<User, string>>;
  getByUsername(username: string): Promise<Result<User, string>>;
}

export function createUserRepo(supabase: SupabaseClient): UserRepository {
  return {
    async create(user): Promise<Result<User, string>> {
      const { data, error } = await supabase
        .from("profile")
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
        .from("profile")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async delete(id): Promise<Result<null, string>> {
      const { error } = await supabase.from("profile").delete().eq("id", id);

      if (error) {
        return err(error.message);
      }
      return ok(null);
    },
    async getById(id: string): Promise<Result<User, string>> {
      const { data, error } = await supabase
        .from("profile")
        .select()
        .eq("auth_id", id)
        .maybeSingle();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
    async getByUsername(username): Promise<Result<User, string>> {
      const { data, error } = await supabase
        .from("profile")
        .select()
        .eq("username", username)
        .maybeSingle();

      if (error) {
        return err(error.message);
      }
      return ok(data);
    },
  };
}
