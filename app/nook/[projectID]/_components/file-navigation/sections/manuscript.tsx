"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuAction,
} from "@/lib/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/lib/components/ui/collapsible";
import {
  ChevronRight,
  Plus,
  FileText,
  BookOpen,
  ImageIcon,
  Film,
  File,
} from "lucide-react";
import { ManuscriptWithChapters } from "@/lib/services/manuscript.service";
import { useManuscriptUI } from "@/lib/contexts/manuscript";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/lib/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";

type Chapter = ManuscriptWithChapters["chapter"][number];
type ChapterContent = Chapter["chapter_content"][number];

interface ManuscriptSectionProps {
  manuscripts: ManuscriptWithChapters[];
  onManuscriptClick?: (manuscript: ManuscriptWithChapters) => void;
  onChapterClick?: (
    chapter: Chapter,
    manuscript: ManuscriptWithChapters,
  ) => void;
  onContentClick?: (
    content: ChapterContent,
    chapter: Chapter,
    manuscript: ManuscriptWithChapters,
  ) => void;
  onAddManuscript?: () => void;
}

function getContentIcon(content: ChapterContent) {
  if (content.scene) return <File className="size-3" />;
  if (content.image) return <ImageIcon className="size-3" />;
  return <BookOpen className="size-3" />;
}

function getContentLabel(content: ChapterContent) {
  if (content.scene)
    return content.scene.display_title || `Scene ${content.position}`;
  if (content.image)
    return content.image.display_title || `Image ${content.position}`;
  return `Content ${content.position}`;
}

export default function ManuscriptSection() {
  const { filteredManuscripts: manuscripts } = useManuscriptUI();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Manuscripts</SidebarGroupLabel>
      <SidebarGroupAction onClick={() => {}}>
        <Plus /> <span className="sr-only">Add Manuscript</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {manuscripts.map((manuscript) => (
            <Collapsible key={manuscript.id} className="group/manuscript">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton onClick={() => {}}>
                    <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=open]/manuscript:rotate-90" />
                    <span>{manuscript.title}</span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal className="size-4" />
                      <span className="sr-only">More options</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem onClick={() => {}}>
                      <Plus className="size-4" />
                      <span>Add Chapter</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {}}>
                      <Pencil className="size-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {}}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="size-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {manuscript.chapter.map((chapter) => (
                      <Collapsible
                        key={chapter.id}
                        asChild
                        className="group/chapter"
                      >
                        <SidebarMenuSubItem>
                          <div className="flex items-center group/chapter-item">
                            <CollapsibleTrigger asChild>
                              <SidebarMenuSubButton
                                onClick={() => {}}
                                className="flex-1"
                              >
                                <span>{chapter.title}</span>
                                {chapter.chapter_content.length > 0 && (
                                  <ChevronRight className="ml-auto size-3 transition-transform group-data-[state=open]/chapter:rotate-90" />
                                )}
                              </SidebarMenuSubButton>
                            </CollapsibleTrigger>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="opacity-0 group-hover/chapter-item:opacity-100 p-1 hover:bg-sidebar-accent rounded-sm transition-opacity">
                                  <MoreHorizontal className="size-3" />
                                  <span className="sr-only">
                                    Chapter options
                                  </span>
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="right" align="start">
                                <DropdownMenuItem onClick={() => {}}>
                                  <Pencil className="size-4" />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {}}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="size-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          {chapter.chapter_content.length > 0 && (
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {chapter.chapter_content.map((content) => (
                                  <SidebarMenuSubItem key={content.id}>
                                    <SidebarMenuSubButton
                                      onClick={() => {}}
                                      className="text-xs"
                                    >
                                      {getContentIcon(content)}
                                      <span>{getContentLabel(content)}</span>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          )}
                        </SidebarMenuSubItem>
                      </Collapsible>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
