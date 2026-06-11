import { useActiveStory } from "@/shared/context/ActiveStoryContext";
import { useStories } from "../hooks/useStories";
import { useStory } from "../hooks/useStory";
import { formatDate } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import StorySelect from "./story-select";
import { useEffect } from "react";
import StorySettings from "./story-settings";

export default function StorySwitcher() {
  const { activeStoryId, setActiveStoryId } = useActiveStory();
  const { data: stories, isLoading: storiesLoading } = useStories();
  const {
    data: story,
    error,
    isLoading: storyLoading,
  } = useStory(activeStoryId ?? stories?.[0]?.id);

  useEffect(() => {
    if (stories && stories.length > 0 && !activeStoryId) {
      setActiveStoryId(stories[0].id);
    }
  }, [stories, activeStoryId, setActiveStoryId]);

  if (storiesLoading) return <div>Loading stories...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <StorySelect stories={stories ?? []}>
      <section className="hover:bg-black/10 flex flex-col gap-2 hover:cursor-pointer p-2 max-w-[16rem] w-full border-r-1">
        <div className="flex gap-2 items-center">
          {story?.coverImage ? (
            <img
              src={story.coverImage}
              alt={story.title}
              className="h-12 w-8 shrink-0 rounded object-cover"
            />
          ) : (
            <div className="h-12 w-8 shrink-0 rounded bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
          )}

          <div className="flex flex-col max-h-24 justify-between">
            <h2 className="text-sm font-bold text-gray-900 leading-tight">
              {story?.title ?? "Untitled"}
            </h2>
            <p className="text-xs text-gray-500">
              {/*Last Updated: {formatDate(story?.lastUpdated)}*/}
              {story?.id}
            </p>
          </div>
        </div>
      </section>
    </StorySelect>
  );
}
