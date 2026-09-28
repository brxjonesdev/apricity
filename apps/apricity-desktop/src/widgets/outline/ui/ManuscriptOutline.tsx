import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { generateKeyBetween } from "fractional-indexing";

import { useManuscriptOutline } from "../model/useManuscriptOutline";
import { ChapterOutlineItem } from "./ChapterOutlineItem";
import { ChapterDropZone } from "./ChapterDropZone";
import { useRef } from "react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/shared/components/shadcn/sidebar";

import { Separator } from "@/shared/components/shadcn/separator";
import { Skeleton } from "@/shared/components/shadcn/skeleton";
import { useUpdateChapterMutation } from "@/entities/chapter";
import AddChapterButton from "@/features/add-chapter/ui/add-chapter-btn";

type ManuscriptOutlineProps = {
  storyId: string | undefined;
};

export default function ManuscriptOutline({
  storyId,
}: ManuscriptOutlineProps) {
  const hoveredChapterIdRef = useRef<string | null>(null);
  const { outline, isLoading } = useManuscriptOutline(storyId);
  const updateChapter = useUpdateChapterMutation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(
      "📚 OUTLINE:",
      outline.map(({ chapter }, index) => ({
        index,
        id: chapter.chapterId,
        order: chapter.order,
      })),
    );
  }, [outline]);

  useEffect(() => {
    if (storyId) {
      setOpen(true);
    }
  }, [storyId]);

  if (isLoading || !storyId) {
    return (
      <>
        <SidebarGroup>
          <SidebarGroupLabel className="items-center gap-3 px-0">
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

        <Separator className="mt-0 pt-0" />
      </>
    );
  }

  return (
    <SidebarGroup
      className={`${
        open
          ? ""
          : "py-0 transition-all duration-200 ease-in-out hover:bg-black/20"
      }`}
    >
      <SidebarGroupLabel className="h-16 max-h-16 cursor-pointer items-center justify-between rounded-none border-b">
        <span>Manuscript</span>

        <AddChapterButton
          storyId={storyId}
          index={outline.length + 1}
        />
      </SidebarGroupLabel>

      <SidebarGroupContent className="px-2">
        <DragDropProvider
          onDragStart={() => {
            hoveredChapterIdRef.current = null;
          }}
          onDragOver={(event) => {
            const { source, target } = event.operation;
        
            if (!source || !target) return;
            if (source.data?.type !== "chapter") return;
            if (target.data?.type !== "chapter") return;
        
            const sourceId = String(source.id);
            const targetId = String(target.id);
        
            if (sourceId === targetId) return;
        
            hoveredChapterIdRef.current = targetId;
        
            console.log("HOVERED CHAPTER:", targetId);
          }}
          onDragEnd={(event) => {
            const { source } = event.operation;
          
            if (event.canceled || !source) {
              hoveredChapterIdRef.current = null;
              return;
            }
          
            if (source.data?.type !== "chapter") {
              hoveredChapterIdRef.current = null;
              return;
            }
          
            const sourceId = String(source.id);
            const targetId = hoveredChapterIdRef.current;
          
            console.log("FINAL REORDER TARGET:", {
              sourceId,
              targetId,
            });
          
            if (!targetId || sourceId === targetId) {
              hoveredChapterIdRef.current = null;
              return;
            }
          
            const current = outline.map(({ chapter }) => chapter);
          
            const sourceIndex = current.findIndex(
              (chapter) => chapter.chapterId === sourceId,
            );
          
            const targetIndex = current.findIndex(
              (chapter) => chapter.chapterId === targetId,
            );
          
            if (sourceIndex === -1 || targetIndex === -1) {
              hoveredChapterIdRef.current = null;
              return;
            }
          
            const moved = current[sourceIndex];
          
            const next = [...current];
            next.splice(sourceIndex, 1);
          
            const targetIndexAfterRemoval = next.findIndex(
              (chapter) => chapter.chapterId === targetId,
            );
          
            if (targetIndexAfterRemoval === -1) {
              hoveredChapterIdRef.current = null;
              return;
            }
          
            const insertIndex =
              targetIndex === 0
                ? 0
                : sourceIndex < targetIndex
                  ? targetIndexAfterRemoval + 1
                  : targetIndexAfterRemoval;
          
            next.splice(insertIndex, 0, moved);
          
            const previous = next[insertIndex - 1];
            const following = next[insertIndex + 1];
          
            const newOrder = generateKeyBetween(
              previous?.order ?? null,
              following?.order ?? null,
            );
          
            console.log("REORDER:", {
              moved: moved.chapterId,
              target: targetId,
              insertIndex,
              newOrder,
            });
          
            updateChapter.mutate({
              updates: {
                story_id: moved.storyId,
                id: moved.chapterId,
                order: newOrder,
              },
            });
          
            hoveredChapterIdRef.current = null;
          }}
        >
          <SidebarMenu>
            {outline.map(({ chapter, scenes }, index) => (
              <ChapterOutlineItem
                key={chapter.chapterId}
                chapter={chapter}
                scenes={scenes}
                index={index}
              />
            ))}
          </SidebarMenu>
        </DragDropProvider>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}