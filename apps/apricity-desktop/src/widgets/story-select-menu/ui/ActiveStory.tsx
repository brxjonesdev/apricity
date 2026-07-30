import { BookOpen } from "lucide-react";
import { Story } from "@/entities/story";
import { Skeleton } from "@/shared/components/shadcn/skeleton";

type ActiveStoryProps = {
  story: Story | undefined;
  isLoading?: boolean;
};

export default function ActiveStory({ story, isLoading }: ActiveStoryProps) {
  if (isLoading) {
    return (
      <span className="flex min-w-0 flex-1 items-center justify-between gap-3 overflow-hidden py-1 text-left">
        <Skeleton className="h-16 w-11 flex-shrink-0 rounded" />
  
        <span className="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </span>
      </span>
    );
  }

  if (!story) {
    return (
      <span className="flex min-w-0 items-center gap-2.5">
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-muted">
          <BookOpen className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </span>

        <span className="flex min-w-0 flex-col items-start">
          <span className="font-medium leading-tight">No active story</span>
          <span className="text-xs font-normal text-muted-foreground">
            Select a story to begin
          </span>
        </span>
      </span>
    );
  }

  return (
    <span className="flex min-w-0 flex-1 items-center justify-between gap-3 overflow-hidden py-1 text-left">
      {story.coverImage ? (
        <img
          src={story.coverImage}
          alt={`Cover art for ${story.title}`}
          className="h-16 w-11 flex-shrink-0 rounded object-cover shadow-sm"
        />
      ) : (
        <span className="flex h-16 w-11 flex-shrink-0 items-center justify-center rounded bg-muted">
          <BookOpen className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </span>
      )}

      <span className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 overflow-hidden">
        <span className="truncate font-medium leading-tight">{story.title}</span>

        {story.synopsis && (
          <span className="truncate text-xs font-normal leading-tight text-muted-foreground">
            {story.synopsis}
          </span>
        )}
      </span>
    </span>
  );
}