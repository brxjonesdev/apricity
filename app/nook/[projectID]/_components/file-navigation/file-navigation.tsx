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

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { searchQuery, setSearchQuery } = useManuscriptUI();

  return (
    <Sidebar className="border-r-0" {...props} variant="floating">
      <SidebarHeader className="flex">
        <div className="w-full bg-white/5 rounded-md border border-white/10 flex items-center space-x-2 p-2 mb-2">
          <p className="p-2">get name</p>
        </div>
        <Link href={`/nook//settings`}>
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
          <Button size={"icon-sm"}>
            <Plus />
          </Button>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent></SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
