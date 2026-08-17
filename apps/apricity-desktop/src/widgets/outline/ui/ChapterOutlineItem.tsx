import { useState } from "react";
import { ChevronRight, Check, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/shared/components/shadcn/collapsible";
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/shared/components/shadcn/sidebar";
import {
  ContextMenu,
  ContextMenuTrigger,
} from "@/shared/components/shadcn/context-menu";
import {
  Chapter,
  useUpdateChapterMutation,
} from "@/entities/chapter";
import { SceneOutline } from "@/entities/scene";
import { SceneOutlineItem } from "./SceneOutlineItem";
import OutlineContextMenu from "./OutlineContextMenu";
import EditorHelper from "@/features/set-editor-view/ui/editor-helper";

type ChapterOutlineItemProps = {
  chapter: Chapter;
  scenes: SceneOutline[];
};

export function ChapterOutlineItem({
  chapter,
  scenes,
}: ChapterOutlineItemProps) {
  const [open, setOpen] = useState(false);
  const [isContextOpen, setContextOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chapter.title);

  const updateChapter = useUpdateChapterMutation();

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setTitle(chapter.title);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitle(chapter.title);
      setIsEditing(false);
      return;
    }

    if (trimmedTitle === chapter.title) {
      setIsEditing(false);
      return;
    }

    updateChapter.mutate(
      {
        updates: {
          id: chapter.chapterId,
          title: trimmedTitle,
          story_id: chapter.storyId,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleCancel = () => {
    setTitle(chapter.title);
    setIsEditing(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  return (
    <ContextMenu onOpenChange={setContextOpen}>
      <SidebarMenuItem>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="w-full">
            <EditorHelper id={chapter.chapterId}>
              <ContextMenuTrigger className="w-full">
                <SidebarMenuButton
                  className={`w-full ${
                    isContextOpen
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }`}
                >
                  {isEditing ? (
                    <div
                      className="flex min-w-0 flex-1 items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                      onDoubleClick={(e) => e.stopPropagation()}
                    >
                      <input
                        autoFocus
                        value={title}
                        onChange={(e) =>
                          setTitle(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        className="min-w-0 flex-1 bg-transparent text-xs outline-none"
                      />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSave();
                        }}
                        disabled={updateChapter.isPending}
                        className="rounded p-1 hover:bg-accent disabled:opacity-50"
                        aria-label="Save chapter title"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancel();
                        }}
                        disabled={updateChapter.isPending}
                        className="rounded p-1 hover:bg-accent disabled:opacity-50"
                        aria-label="Cancel editing"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span
                      className="min-w-0 flex-1 truncate text-xs"
                      onDoubleClick={handleDoubleClick}
                    >
                      {chapter.title}
                    </span>
                  )}

                  {!isEditing && (
                    <ChevronRight
                      className={`ml-auto h-4 w-4 transition-transform ${
                        open ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </SidebarMenuButton>
              </ContextMenuTrigger>
            </EditorHelper>
          </CollapsibleTrigger>

          <CollapsibleContent>
            {scenes.map((scene) => (
              <SceneOutlineItem
                key={scene.sceneId}
                scene={scene}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>

      <OutlineContextMenu item={chapter} type="chapter" />
    </ContextMenu>
  );
}