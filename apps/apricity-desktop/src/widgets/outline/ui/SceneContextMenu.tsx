import { useActiveStory } from "@/app/layouts/contexts/active-story.context";
import {
  useChaptersByStoryQuery,
} from "@/entities/chapter";
import { SceneOutline, useUpdateSceneMutation } from "@/entities/scene";
import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/shared/components/shadcn/context-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/shadcn/alert-dialog";
import { useEditorView } from "@/widgets/editor/model/editor-context";
import { useState } from "react";
import { generateKeyBetween } from "fractional-indexing";

type SceneContextMenuProps = {
  scene: SceneOutline;
  index: number;
  scenes: SceneOutline[];
};

export function SceneContextMenu({
  scene,
  index,
 scenes,
}: SceneContextMenuProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { activeStoryId } = useActiveStory();
  const { data: chapters = [] } =
    useChaptersByStoryQuery(activeStoryId);

  const { setActiveID } = useEditorView();
  const updateScene = useUpdateSceneMutation();
  const moveSceneUp = () => {
    if (index === 0) return;
  
    const previous = scenes[index - 2];
    const target = scenes[index - 1];
  
    const newOrder = generateKeyBetween(
      previous?.order ?? null,
      target.order,
    );
  
    updateScene.mutate({
      sceneId: scene.sceneId,
      updates: {
        order: newOrder,
      },
    });
  };
  const moveSceneDown = () => {
    if (index === scenes.length - 1) return;
  
    const target = scenes[index + 1];
    const following = scenes[index + 2];
  
    const newOrder = generateKeyBetween(
      target.order,
      following?.order ?? null,
    );
  
    updateScene.mutate({
      sceneId: scene.sceneId,
      updates: {
        order: newOrder,
      },
    });
  };

  return (
    <>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem
            onClick={() => {
              setActiveID(scene.sceneId);
            }}
          >
            Open
          </ContextMenuItem>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuGroup>
          <ContextMenuItem
            disabled={index === 0}
            onClick={moveSceneUp}
          >
            Move Up
          </ContextMenuItem>
          
          <ContextMenuItem
            disabled={index === scenes.length - 1}
            onClick={moveSceneDown}
          >
            Move Down
          </ContextMenuItem>

          <ContextMenuSub>
            <ContextMenuSubTrigger>
              Move Scene to Chapter
            </ContextMenuSubTrigger>

            <ContextMenuSubContent>
              {chapters
                .filter(
                  (chapter) =>
                    chapter.chapterId !== scene.chapterId
                )
                .map((chapter) => (
                  <ContextMenuItem
                    key={chapter.chapterId}
                  >
                    {chapter.title}
                  </ContextMenuItem>
                ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuGroup>
          <ContextMenuItem
            variant="destructive"
            onSelect={(event) => {
              event.preventDefault();
              setDeleteOpen(true);
            }}
          >
            Trash
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>

      <AlertDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete scene?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This will permanently delete "{scene.title}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}