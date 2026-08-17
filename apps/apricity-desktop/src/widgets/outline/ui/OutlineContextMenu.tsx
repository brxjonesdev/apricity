import { useActiveStory } from "@/app/layouts/contexts/active-story.context";
import { Chapter, useChaptersByStoryQuery, useUpdateChapterMutation } from "@/entities/chapter";
import { SceneOutline } from "@/entities/scene";
import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/shared/components/shadcn/context-menu";
import { useEditorView } from "@/widgets/editor/model/editor-context";

type OutlineContextMenuProps =
  | {
      item: Chapter;
      type: "chapter";
    }
  | {
      item: SceneOutline;
      type: "scene";
    };

export default function OutlineContextMenu({
  item,
  type,
}: OutlineContextMenuProps) {
  const {activeStoryId} = useActiveStory()
  const { data: chapters = [] } = useChaptersByStoryQuery(activeStoryId)
  const { setActiveID } = useEditorView()
  const changeStatus = useUpdateChapterMutation();
  return (
    <ContextMenuContent>
      <ContextMenuGroup>
        <ContextMenuItem
          onClick={() => {
            if (type === 'chapter') {
              setActiveID(item.chapterId);
            } else {
              setActiveID(item.sceneId);
            }
          }}
        >
          Open
        </ContextMenuItem>
        {type === 'chapter' && (
          <ContextMenuSub>
            <ContextMenuSubTrigger>Change Status</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              {["Draft", "In-Progress", "Complete"].map((status, index) => (
                <ContextMenuItem
                  key={status}
                  className={item.status === status.toLocaleLowerCase() ? "bg-accent" : ""}
                  onClick={() => {
                    if (item.status === status.toLocaleLowerCase()) return;
              
                    changeStatus.mutate({
                      updates: {
                        id: item.chapterId,
                        story_id: item.storyId,
                        status: index as 0 | 1 | 2,
                      },
                    });
                  }}
                >
                  {status}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
        )}
        {/*
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuItem>Export</ContextMenuItem>
        */}
      </ContextMenuGroup>
      <ContextMenuSeparator />
      <ContextMenuGroup>
        <ContextMenuItem>Move Up</ContextMenuItem>
        <ContextMenuItem>Move Down</ContextMenuItem>
        {type === 'scene' && (
          <ContextMenuSub>
            <ContextMenuSubTrigger>Move Scene to Chapter</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              {chapters
                .filter((chapter) => item.chapterId !== chapter.chapterId)
                .map((chapter) => {
                  return <ContextMenuItem>{chapter.title}</ContextMenuItem>;
                })}
            </ContextMenuSubContent>
          </ContextMenuSub>
        )}
      </ContextMenuGroup>
      <ContextMenuSeparator />
      <ContextMenuGroup>
        <ContextMenuItem>Duplicate</ContextMenuItem>
        <ContextMenuItem>Archive</ContextMenuItem>
        <ContextMenuItem>Trash</ContextMenuItem>
      </ContextMenuGroup>
    </ContextMenuContent>
  );
}