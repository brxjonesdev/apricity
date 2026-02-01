"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/lib/components/ui/sidebar";
import { ArrowLeft, FileText, Image as ImageIcon, Plus } from "lucide-react"; // Optional icons
import { Button } from "@/lib/components/ui/button";
import { Separator } from "@/lib/components/ui/separator";
import Link from "next/link";
import { Input } from "@/lib/components/ui/input";
import { useManuscriptUI } from "@/lib/contexts/manuscript";
import { useProject } from "@/lib/contexts/projectsContext";
import AddResource from "../add-resource";
import ManuscriptSection from "./sections/manuscript";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { searchQuery, setSearchQuery } = useManuscriptUI();
  const { project } = useProject();

  return (
    <Sidebar className="border-r-0" {...props} variant="floating">
      <SidebarHeader className="flex">
        <div className="w-full bg-white/5 rounded-md border border-white/10 flex flex-col  space-x-2 p-2 mb-2">
          <p className="p-2">{project.name}</p>
          {project.blurb && (
            <>
              <Separator />
              <p className="p-2 text-xs text-muted-foreground">
                {project.blurb}
              </p>
            </>
          )}
        </div>
        <Link href={`/nook/${project.project_id}/settings`}>
          <Button className="w-full">Project Settings</Button>
        </Link>
        <div className="flex items-center space-x-2  w-full">
          <Input
            placeholder="Search..."
            className="w-full"
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Separator orientation="vertical" />
          <AddResource />
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <ManuscriptSection />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
