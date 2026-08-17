import { useStoriesBySeriesQuery } from "@/entities/story";
import { useMemo } from "react";
import { StoryCard } from "./story-grid-card";

type Props = {
  id: string;
  onSuccess: () => void
}
export default function UpdateSeriesStoryGrid({
  id,
  onSuccess,
}: Props) {
  const { data: stories = [], isLoading } =
    useStoriesBySeriesQuery(id);

  // const reorderStory = useReorderStoryMutation();

  const sortedStories = useMemo(() => {
    return [...stories].sort((a, b) => {
      if (a.order === null) return 1;
      if (b.order === null) return -1;

      return a.order.localeCompare(b.order);
    });
  }, [stories]);

  if (isLoading) {
    return <div>Loading stories...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {sortedStories.map((story) => (
        <StoryCard
          key={story.storyId}
          story={story}
        />
      ))}
    </div>
  );
}