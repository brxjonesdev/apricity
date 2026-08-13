import { Book, BookOpen, ChevronRight } from "lucide-react";

import { useManuscriptOutline } from "../model/useManuscriptOutline";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/shadcn/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/shared/components/shadcn/sidebar";
import { ChapterOutlineItem } from "./ChapterOutlineItem";
import { useEffect, useState } from "react";
import { Separator } from "@/shared/components/shadcn/separator";
import { Skeleton } from "@/shared/components/shadcn/skeleton";
import { Button } from "@/shared/components/shadcn/button";
import AddChapterButton from "@/features/add-chapter/ui/add-chapter-btn";

type ManuscriptOutlineProps = {
  storyId: string | undefined;
};

export default function ManuscriptOutline({ storyId }: ManuscriptOutlineProps) {
  const { outline, isLoading } = useManuscriptOutline(storyId);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (storyId) {
      setOpen(true);
    }
  }, [storyId]);

  if (isLoading || !storyId) {
    return (
      <>
        <SidebarGroup>
          <SidebarGroupLabel className="gap-3 px-0 items-center">
            <BookOpen className="h-3 w-3" />
            <span>Manuscript</span>
          </SidebarGroupLabel>
  
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 pt-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-4/5" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
  
        <Separator className="pt-0 mt-0" />
      </>
    );
  }

  return (
    <>
      <Collapsible open={open} onOpenChange={setOpen} disabled={!storyId ? true : false}>
        <SidebarGroup className={`${open ? "" : "hover:bg-black/20 transition-all duration-200 ease-in-out"}`}>
          <CollapsibleTrigger>
            <SidebarGroupLabel className='cursor-pointer gap-3 px-0 items-center '>
              {!open ? (
                <Book
                  className={`h-3 w-3 transition-transform duration-200 ease-in-out `}
                />
              ) : (
                <BookOpen
                  className={`h-3 w-3 transition-transform duration-200 ease-in-out `}
                />
              )}
              <span>Manuscript</span>
            </SidebarGroupLabel>
          </CollapsibleTrigger>
  
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {outline.map(({ chapter, scenes }) => (
                  <ChapterOutlineItem
                    key={chapter.chapterId}
                    chapter={chapter}
                    scenes={scenes}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            <AddChapterButton storyId={storyId} index={outline.length + 1}/>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
      <Separator className="pt-0 mt-0" />
    </>
  );
}