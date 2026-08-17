import { StoryInSeries } from "@/entities/story/types";

export function StoryCard({ story }: { story: StoryInSeries }) {
  return (
    <div>
      {story.title}
    </div>
  )
}