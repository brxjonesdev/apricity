"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/lib/components/ui/sidebar";
import { ArrowLeft, FileText, Image as ImageIcon, Plus, X } from "lucide-react"; // Optional icons
import { Button } from "@/lib/components/ui/button";
import { Separator } from "@/lib/components/ui/separator";
import Link from "next/link";
import { Input } from "@/lib/components/ui/input";
import { useManuscriptUI } from "@/lib/contexts/manuscript";
import { useProject } from "@/lib/contexts/projectsContext";
import AddResource from "../add-resource";
import ManuscriptSection from "./sections/manuscript";
import Settings from "../settings/settings";

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
        <Settings />
        <div className="flex items-center space-x-2  w-full">
          <div className="relative w-full">
            <Input
              placeholder="Search..."
              className="w-full pr-10"
              value={searchQuery || ""}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ? (
              <Button
                size="icon-sm"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X />
              </Button>
            ) : null}
          </div>
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
