import { useActiveStory } from "@/app/layouts/contexts/active-story.context";
import { Story } from "@/entities/story"
import { Button } from "@/shared/components/shadcn/button";
import { Card } from "@/shared/components/shadcn/card";
export default function SelectMenu({ stories }: { stories: Story[] }) {
  const {setActiveStoryId} = useActiveStory()

  const empty = stories.length === 0;

  return (
    <Card>
      {stories.map((story) => {
        return (
          <div>
            <span>{story.title}</span>
            <Button onClick={() => {
              setActiveStoryId(story.storyId)
            }}>
              Set Active
            </Button>
          </div>
        )
      })}
    </Card>
  )
}