import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function getSupabaseUser(supabaseClient: SupabaseClient) {
  const { data: { user }, error } = await supabaseClient.auth.getUser();
  if (error) {
    console.error("Error fetching user:", error.message);
    // redirect to login page
    redirect("/auth/signin");
  }
  if (!user) {
    // No user found, redirect to login page
    redirect("/auth/signin");
  }
  return user;
}
