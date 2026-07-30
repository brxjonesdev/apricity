import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/shared/components/shadcn/popover"
import { Button } from "@/shared/components/shadcn/button"
import ActiveStory from "./activeStory";
import { useStoriesQuery } from "@/entities/story"
import { useActiveStory } from "@/app/layouts/contexts/active-story.context";
import SelectMenu from "..";
import { cn } from "@/shared/utils";
import { useSeriesQuery } from "@/entities/series";

export default function StorySelect() {
  const { data: stories, isLoading: storiesLoading } = useStoriesQuery();
  const { data: series, isLoading: seriesLoading } = useSeriesQuery();
  const { activeStoryId, isLoading: activeStoryLoading } = useActiveStory();

  const isLoading = storiesLoading || seriesLoading || activeStoryLoading;

  const activeStory = stories?.find((s) => s.storyId === activeStoryId);

  return (
    <Popover>
      <PopoverTrigger disabled={isLoading || !stories || stories.length === 0} asChild>
        <Button
          variant="outline"
          className={cn(
            "transition-[height] duration-300 ease-in-out justify-between w-full",
            !activeStory?.coverImage ? "h-12" : "h-24"
          )}
        >
          <ActiveStory
            story={activeStory}
            isLoading={isLoading}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="right"
        align="start"
        className="shadow-none w-full p-0 border-none"
      >
        <SelectMenu
          stories={stories ?? []}
          series={series ?? []}
        />
      </PopoverContent>
    </Popover>
  );
}