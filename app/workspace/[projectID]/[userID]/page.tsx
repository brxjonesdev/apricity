import { getSupabaseUser } from "@/lib/features/authentication/supabase/utils";
import { createClient } from "@/lib/features/authentication/supabase/server";
import { redirect } from "next/navigation";
import { Card } from "@/lib/components/ui/card";

export default async function WorkspaceHome({params}: {
  params: Promise<{projectID: string, userID: string}>
}) {
  const { projectID, userID } = await params;
  const supabase = await createClient();
  const user = await getSupabaseUser(supabase)
  if (!user || user.id !== userID) {
    redirect('/auth/signin')
  }

  return <Card className="flex-1">
    <p>
      Welcome to the workspace for project {projectID}, user {userID}!
    </p>
   this shows a broad view of the project workspace where you can access various features and tools related to your project.
   </Card>
}
