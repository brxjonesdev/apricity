import type { Story } from '@/entities/story';
import {
  useArchiveStoryMutation,
  useDeleteStoryMutation,
  useUpdateStoryMutation,
} from '@/entities/story';
import DeleteStoryModal from '@/features/delete-story/ui/delete-story';
import DeleteStoryButton from '@/features/delete-story/ui/delete-story';
import EditStoryModal from '@/features/edit-story-details/ui/edit-story-details-modal';
import EditStoryDetails from '@/features/edit-story-details/ui/edit-story-details-modal';
import {
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuItem,
} from '@/shared/components/shadcn/context-menu';
import { useState } from 'react';
import { de } from 'zod/v4/locales';
// import { RenameStoryMenuItem } from '@/features/rename-story';
// import { ChangeCoverImageMenuItem } from '@/features/change-cover-image';

export function StoryContextMenu({ story }: { story: Story }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const archiveStory = useArchiveStoryMutation();
  const restoreStory = useUpdateStoryMutation();

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
        {!story.isArchived ? (
          <ContextMenuItem
            onClick={() => archiveStory.mutate({ storyId: story.storyId })}
          >
            Archive
          </ContextMenuItem>
        ) : (
          <ContextMenuItem
            onClick={() =>
              restoreStory.mutate({
                update: {
                  id: story.storyId,
                  is_archived: false,
                },
              })
            }
          >
            Restore
          </ContextMenuItem>
        )}
        {story.seriesId && <ContextMenuItem>Change Order</ContextMenuItem>}
        {!story.seriesId && <ContextMenuItem>Move to Series</ContextMenuItem>}
        <ContextMenuSeparator />
        {story.seriesId && (
          <ContextMenuItem variant='destructive'>
            Remove from Series
          </ContextMenuItem>
        )}
        <ContextMenuItem
          variant='destructive'
          onSelect={(e) => {
            e.preventDefault();
            setDeleteOpen(true);
          }}
        >
          Delete
        </ContextMenuItem>
      </ContextMenuGroup>

      <EditStoryModal
        id={story.storyId}
        open={editOpen}
        onOpenChange={setEditOpen}
        title={story.title}
        synopsis={story.synopsis}
        coverImage={story.coverImage}
      />
      <DeleteStoryModal
        id={story.storyId}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
