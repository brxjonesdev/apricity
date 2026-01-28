import { Database } from "@/lib/supabase/types";
import { Result, ok, err } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

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
      // Implementation
      return err("Not implemented");
    },
    async update(id, updates): Promise<Result<User, string>> {
      // Implementation
      return err("Not implemented");
    },
    async delete(id): Promise<Result<null, string>> {
      // Implementation
      return err("Not implemented");
    },
    async getById(id): Promise<Result<User, string>> {
      // Implementation
      return err("Not implemented");
    },
  }
}
