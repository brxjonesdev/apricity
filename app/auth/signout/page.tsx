import { createClient } from "@/lib/features/authentication/supabase/server"
import { redirect } from "next/navigation"

export default async function SignOutPage() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/auth/signin')
}
