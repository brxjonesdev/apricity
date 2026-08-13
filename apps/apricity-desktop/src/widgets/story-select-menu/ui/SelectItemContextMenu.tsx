import type { Story } from '@/entities/story';
import { useDeleteStoryMutation } from '@/entities/story';
import EditStoryDetails from '@/features/edit-story-details/ui/edit-story-details-modal';
import {
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuItem,
} from '@/shared/components/shadcn/context-menu';
import { useState } from 'react';
// import { RenameStoryMenuItem } from '@/features/rename-story';
// import { ChangeCoverImageMenuItem } from '@/features/change-cover-image';

export function StoryContextMenu({ story }: { story: Story }) {
  const [editOpen, setEditOpen] = useState(false);
  const deleteStory = useDeleteStoryMutation();

  return (
    <>
      <ContextMenuGroup>
        <ContextMenuLabel>{story.title}</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setEditOpen(true);
          }}
        >
          Edit
        </ContextMenuItem>
        <ContextMenuItem>Archive</ContextMenuItem>
        {story.seriesId && <ContextMenuItem>Change Order</ContextMenuItem>}
        {!story.seriesId && <ContextMenuItem>Move to Series</ContextMenuItem>}
        <ContextMenuSeparator />
        {story.seriesId && (
          <ContextMenuItem variant='destructive'>
            Remove from Series
          </ContextMenuItem>
        )}
        <ContextMenuItem
          onClick={() => deleteStory.mutate({ storyId: story.storyId })}
          variant='destructive'
        >
          Delete
        </ContextMenuItem>
      </ContextMenuGroup>

      <EditStoryDetails
        id={story.storyId}
        open={editOpen}
        onOpenChange={setEditOpen}
        title={story.title}
        synopsis={story.synopsis}
        coverImage={story.coverImage}
      />
    </>
  );
}
