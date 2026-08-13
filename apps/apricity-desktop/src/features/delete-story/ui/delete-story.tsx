import { useDeleteStoryMutation } from '@/entities/story';
import { Button } from '@/shared/components/shadcn/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/shadcn/alert-dialog';
import { useStoriesQuery } from '@/entities/story';
import { useActiveStory } from '@/app/layouts/contexts/active-story.context';

type Props = {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DeleteStoryModal({ id, open, onOpenChange }: Props) {
  const deleteStory = useDeleteStoryMutation();
  const { data: stories } = useStoriesQuery();
  const { setActiveStoryId } = useActiveStory();

  // TODO: Fix the logic in selecting a new story after delete
  const handleDelete = () => {
    deleteStory.mutate(
      { storyId: id },
      {
        onSuccess: () => {
          onOpenChange(false);
  
          const nextStory = stories?.find(
            (story) => !story.isArchived && story.storyId !== id
          );
  
          // setActiveStoryId(nextStory?.storyId ?? null);
        },
      },
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className='w-fit'>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this story?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the story
            and all of its associated content.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteStory.isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteStory.isPending}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          >
            {deleteStory.isPending ? 'Deleting...' : 'Delete Story'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
