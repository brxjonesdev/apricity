import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/lib/components/ui/card"
import { Button } from "@/lib/components/ui/button"
import { Avatar, AvatarFallback } from "@/lib/components/ui/avatar"
import { Plus, BookOpen } from "lucide-react"

import { getServices } from "@/lib/services"
import { getSupabaseUser } from "@/lib/supabase/utils"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProjectsListWrapper } from "./_components/projects-list-wrapper"
import CreateProjectButton from "./_components/create-project"
import { revalidatePath } from "next/cache"
import SignOut from "@/lib/components/auth/sign-out"

export default async function StartPage() {
  const supabase = await createClient()
  const { userService } = await getServices()

  const user = await getSupabaseUser(supabase)
  console.log("user like now:", user)
  if (!user) {
    redirect("/")
  }

  const isOnboardedResult = await userService.userExists(user.id)
  console.log("isOnboardedResult:", isOnboardedResult)
  if (!isOnboardedResult.ok) {
    redirect("/start/onboarding")
  }

  const profileResult = await userService.getUserProfile(user.id)
  console.log("profileResult:", profileResult)
  if (!profileResult.ok) {
    redirect("/start/onboarding")
  }

  const profileData = profileResult.data

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  async function handleCreateProject({
    userId,
    name,
    blurb,
  }: {
    userId: string
    name: string
    blurb?: string
  }) {
    "use server"

    const { manuscriptService } = await getServices()

    const result = await manuscriptService.createProject({
      user_id: userId,
      name,
      blurb,
    })

    if (!result.ok) {
      return { success: false, error: result.error }
    }
    revalidatePath("/start")

    return { success: true }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 py-8 w-full">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                  {getInitials(profileData.display_name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Welcome back, {profileData.display_name}
                </h1>
                <p className="text-sm text-muted-foreground">@{profileData.username}</p>
              </div>
            </div>
            <SignOut />
          </div>
        </header>

        {/* Projects Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Your Projects</span>
            </CardTitle>

            <CardAction>
              <CreateProjectButton
                userId={profileData.auth_id}
                onCreate={handleCreateProject} />
            </CardAction>
          </CardHeader>
          <CardContent>
            <ProjectsListWrapper userId={profileData.auth_id} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
