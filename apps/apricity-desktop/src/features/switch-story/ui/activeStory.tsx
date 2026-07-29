import { BookOpen } from "lucide-react";
import { Story } from "@/entities/story";

export default function ActiveStory({ story }: { story: Story | undefined }) {
  if (!story) {
    return (
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-muted p-2">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="flex flex-col items-start">
          <span className="font-medium">
            No active story
          </span>
          <span className="text-xs text-muted-foreground">
            Select a story to begin
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start">
      <span className="font-medium">
        {story.title}
      </span>

      <span className="line-clamp-1 text-xs text-muted-foreground">
        {story.synopsis || "No synopsis available."}
      </span>
    </div>
  );
}