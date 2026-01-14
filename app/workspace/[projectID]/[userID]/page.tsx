import { getSupabaseUser } from "@/lib/features/authentication/supabase/utils";
import { createClient } from "@/lib/features/authentication/supabase/server";
import { redirect } from "next/navigation";

export default async function WorkspaceHome({params}: {
  params: Promise<{projectID: string, userID: string}>
}) {
  const { projectID, userID } = await params;
  const supabase = await createClient();
  const user = await getSupabaseUser(supabase)
  if (!user || user.id !== userID) {
    redirect('/auth/signin')
  }

   return (<>
     <section className='flex-1 p-4 flex'>


     </section>
   </>)
}
