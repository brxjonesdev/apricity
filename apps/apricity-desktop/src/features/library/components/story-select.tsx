import { Button } from "@/shared/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/components/shadcn/dropdown-menu";
import { useActiveStory } from "@/shared/lib/context/ActiveStoryContext";
import { useCreateStory } from "../hooks/useCreateStory";
import { Separator } from "@/shared/components/shadcn/separator";
import CreateStory from "./create-story";
import CreateSeries from "./create-series";
import StorySelectButton from "./story-select-button";
import { useState } from "react";
import { StoryDTO } from "../story.dto";
export default function StorySelect({
  stories,
  children,
}: {
  stories: StoryDTO[];
  children: React.ReactNode;
}) {
  const { activeStoryId, setActiveStoryId } = useActiveStory();
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={(v) => setOpen(v)}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[15rem]" align="center">
        <DropdownMenuGroup className="flex flex-col gap-2">
          <DropdownMenuItem asChild>
            <CreateStory />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <CreateSeries />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <Separator className="mb-3 mt-2" />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-center">
            My Library
          </DropdownMenuLabel>
          {stories.map((story) => (
            <DropdownMenuItem key={story.id} asChild>
              <StorySelectButton
                storyId={story.id}
                title={story.title}
                isActive={activeStoryId === story.id}
                closeDropdown={() => setOpen(false)}
              />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
