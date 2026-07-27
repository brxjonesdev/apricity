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
import { useState } from "react";
import { cn } from "@/shared/utils";
import { Separator } from "@/shared/components/shadcn/separator";

type ManuscriptOutlineProps = {
  storyId: string;
};

export default function ManuscriptOutline({ storyId }: ManuscriptOutlineProps) {
  const { outline, isLoading } = useManuscriptOutline(storyId);
  const [open, setOpen] = useState(true);

  if (isLoading) return null;
  console.log(outline)

  return (
    <>
    <Collapsible open={open} onOpenChange={setOpen}>
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
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
    <Separator className={`pt-0 mt-0`}/>
    </>
  );
}