import type { Story } from '@/entities/story';
import { useDeleteStoryMutation } from '@/entities/story';
import { ContextMenuGroup, ContextMenuLabel, ContextMenuSeparator, ContextMenuItem } from '@/shared/components/shadcn/context-menu';
// import { RenameStoryMenuItem } from '@/features/rename-story';
// import { ChangeCoverImageMenuItem } from '@/features/change-cover-image';

export function StoryContextMenu({ story }: { story: Story }) {
  const deleteStory = useDeleteStoryMutation();

  return (
    <ContextMenuGroup>
      <ContextMenuLabel>{story.title}</ContextMenuLabel>
      <ContextMenuSeparator />
      {/* <RenameStoryMenuItem storyId={story.storyId} currentTitle={story.title} /> — feature, has edit state */}
      <ContextMenuItem>Rename</ContextMenuItem>

      <ContextMenuItem onClick={() => deleteStory.mutate({storyId: story.storyId})}>
        Delete
      </ContextMenuItem>
      <ContextMenuItem disabled>Change Cover Image</ContextMenuItem>
    </ContextMenuGroup>
  );
}