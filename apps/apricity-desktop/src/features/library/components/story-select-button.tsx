import { Button } from "@/shared/components/shadcn/button";
import { useActiveStory } from "@/shared/context/ActiveStoryContext";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/shared/components/shadcn/popover";
import StorySettings from "./story-settings";
import { BookOpen } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/shadcn/card";
import ArchiveStoryButton from "./archive-story-button";
import { Separator } from "@/shared/components/shadcn/separator";
export default function StorySelectButton({
  storyId,
  title,
  isActive,
  closeDropdown,
}: {
  storyId: string;
  title: string;
  isActive?: boolean;
  closeDropdown: () => void;
}) {
  const { setActiveStoryId } = useActiveStory();

  const handleSelect = () => {
    closeDropdown();
    if (isActive) {
      return;
    }
    setActiveStoryId(storyId);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={`bg-gray-100 w-full h-10 ${isActive ? "text-white bg-blue-500" : ""}`}
        >
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" asChild>
        <Card className="w-full gap-1 p-2">
          <CardHeader>
            <CardTitle>{title} Menu</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-0 flex gap-2">
            <Button
              onClick={handleSelect}
              variant={"outline"}
              className="h-10 w-10"
              size={"icon-lg"}
              disabled={isActive}
            >
              <BookOpen />
            </Button>
            <StorySettings id={storyId} />
            <ArchiveStoryButton storyId={storyId} title={title} />
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
