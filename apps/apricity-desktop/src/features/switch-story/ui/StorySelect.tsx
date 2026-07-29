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
import SelectMenu from "./select-menu";
import { cn } from "@/shared/utils";

export default function StorySelect() {
  const { data: stories } = useStoriesQuery();
  const { activeStoryId } = useActiveStory()
  const activeStory = stories?.find((s) => s.storyId === activeStoryId)
  return (
    <Popover>
      <PopoverTrigger disabled={!stories || stories.length === 0} asChild>
        <Button
          variant="outline"
          className={cn(
            "transition-[height] duration-300 ease-in-out justify-between w-full ",
            !activeStory?.coverImage ? "h-12" : "h-24"
          )}
        >
          <ActiveStory story={activeStory} />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" className="shadow-none w-full p-0 border-none" >
        <SelectMenu stories={stories ?? []} />
      </PopoverContent>
    </Popover>
  )
}