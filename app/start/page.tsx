import { Card, CardHeader, CardTitle, CardFooter, CardContent } from "@/lib/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar"
import { Button } from "@/lib/components/ui/button"
import { ScrollArea } from "@/lib/components/ui/scroll-area"
import { ChevronDown, PlayCircle, Projector } from "lucide-react"
import { Project } from "@/lib/features/projects/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu"

import EmptyProjects from "@/lib/features/projects/components/empty-projects";
import { getSupabaseUser } from "@/lib/features/authentication/supabase/utils";
import { createClient } from "@/lib/features/authentication/supabase/server";
import { createProjectService } from "@/lib/features/projects/index";
import { CreateProject } from "@/lib/features/projects/components/create-project";
import ProjectCard from "@/lib/features/projects/components/project-card";
export default async function StartPage() {
  const supabase = await createClient();
  const user = await getSupabaseUser(supabase);

  const projectsService = createProjectService(user.id)
  const projects = await projectsService.getAllProjects();
  if (!projects.ok) {
    throw new Error("Failed to fetch projects");
  }






  return (
    <main className='flex min-h-screen flex-col p-6'>
      <section className="flex-1 w-full h-full flex justify-center items-center">
        <div className="w-full max-w-4xl h-[600px] bg-background border border-border rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header with User Info */}
          <header className="px-6 py-4 border-b border-border flex items-center justify-between bg-card/30">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={user?.user_metadata.avatar_url} alt="@shadcn" className="object-cover" />
                <AvatarFallback>
                  {String(user?.user_metadata?.full_name || "")
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((part: string) => part[0])
                    .join("")
                    .toUpperCase() || "?"}
                </AvatarFallback>

              </Avatar>
              <div>
                <h2 className="text-sm font-semibold tracking-tight">{user?.user_metadata.name}</h2>
                <p className="text-xs text-muted-foreground">Junior Novelist</p>
              </div>
            </div>
            {projects && projects.data.length < 1 ? (
              <h1 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Projects
              </h1>
            ) : (
                <CreateProject id={user.id} />
            )}

          </header>

          {/* Main Content Area */}
          <div className="flex flex-1 overflow-hidden">
             {/* Projects Grid */}
            <section className="flex-1 bg-background/50 flex">
              {projects.data.length > 0 && (
                <ScrollArea className="h-full flex-1 flex">
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full ">
                    {projects.data.map((project: Project) => (
                      <ProjectCard key={project.id} project={project} userID={user.id} />
                    ))}
                  </div>
                </ScrollArea>
              )}
              {projects.data.length === 0 && (
                <EmptyProjects id={user.id}/>
              )}
            </section>
          </div>

          {/* Footer */}
          <footer className="px-4 py-3 border-t border-border bg-card/30 flex h-fit">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm" className="h-8 gap-2 bg-[#4a4a4a] text-white hover:bg-[#5a5a5a] ml-auto">
                  Options <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="" side="top">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  <Link href="/settings" className="w-full" >
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Link href="/help" className="w-full">
                    Help & Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/auth/signout" className="w-full text-red-600">
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </footer>
        </div>
      </section>
    </main>
  )
}
