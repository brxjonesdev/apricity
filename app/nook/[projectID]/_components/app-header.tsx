"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/lib/components/ui/button";
import { Separator } from "@/lib/components/ui/separator";
import Link from "next/link";
import { SidebarTrigger } from "@/lib/components/ui/sidebar";
import { useProject } from "@/lib/contexts/projectsContext";
export default function AppHeader() {
  const { project } = useProject();
  return (
    <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2">
      <div className="flex flex-1 items-center gap-2 px-3">
        <Link href="/start">
          <Button size={"sm"} className="text-xs">
            <ArrowLeft className="h-2 w-2" />
            Back to Projects
          </Button>
        </Link>
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-lg font-medium">{project.name}</h1>
      </div>
    </header>
  );
}
