import { useActiveStory } from "@/shared/context/ActiveStoryContext";
import { Chapter, ChapterWithScenes, Scene } from "../types";
import { useChaptersWithScenes } from "../hooks/queries/useChaptersWithScenes";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/shadcn/sidebar";
import ChapterCard from "./chapter-card";
import { Button } from "@/shared/components/shadcn/button";
import { Plus } from "lucide-react";
import { useCreateChapter } from "../hooks/mutations/useCreateChapter";
export default function Manuscript() {
  const { activeStoryId } = useActiveStory();

  const { data: chapters = [], isLoading } =
    useChaptersWithScenes(activeStoryId);

  const { mutate, isPending } = useCreateChapter(activeStoryId);

  const createNewChapter = () => {
    if (!activeStoryId) return;

    mutate({
      title: "New Chapter",
      order: chapters.length + 1,
      storyId: activeStoryId,
    });
  };

  if (!activeStoryId) return null;
  if (isLoading) return null;
  if (isPending) return null;

  return (
    <SidebarGroup className="flex flex-col">
      <div className="flex items-center justify-between pr-1">
        <SidebarGroupLabel className="px-0">Manuscript</SidebarGroupLabel>
      </div>

      <SidebarMenu>
        <SidebarMenuItem className="mb-2">
          <SidebarMenuButton asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full h-full min-h-6 p-0 mb-2"
              disabled={!activeStoryId || isPending}
              onClick={createNewChapter}
            >
              New Chapter
              <Plus className="ml-2 h-4 w-4" />
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {chapters.map((chapter) => (
          <ChapterCard key={chapter.id} chapter={chapter} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
