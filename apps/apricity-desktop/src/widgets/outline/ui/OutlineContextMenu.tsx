import { Chapter } from "@/entities/chapter";
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

type MenuAction = {
  label: string;
  action?: () => void;
  children?: MenuAction[];
};

export default function OutlineContextMenu({
  item,
  type,
}: {
  item: Chapter | SceneOutline;
  type: "chapter" | "scene";
  }) {
 
  const menuActions: Record<string, MenuAction[]> = {
    base: [
      {
        label: "Open",
        action: () => {},
      },
      {
        label: "Duplicate",
        action: () => {},
      },
      {
        label: "Change Status",
        children: [
          {
            label: "Draft",
            action: () => {},
          },
          {
            label: "Review",
            action: () => {},
          },
          {
            label: "Complete",
            action: () => {},
          },
        ],
      },
      {
        label: "Export",
        children: [
          {
            label: "Markdown",
            action: () => {},
          },
          {
            label: "PDF",
            action: () => {},
          },
          {
            label: "JSON",
            action: () => {},
          },
        ],
      },
      {
        label: "Trash",
        action: () => {},
      },
    ],

    insert: [
      {
        label: "Insert Before",
        action: () => {},
      },
      {
        label: "Insert After",
        action: () => {},
      },
    ],

    organize: [
      {
        label: "Move Up",
        action: () => {},
      },
      {
        label: "Move Down",
        action: () => {},
      },
      {
        label: "Move To",
        children: [
          {
            label: "Chapter",
            action: () => {},
          },
          {
            label: "Scene",
            action: () => {},
          },
        ],
      },
      {
        label: "Copy To",
        children: [
          {
            label: "Chapter",
            action: () => {},
          },
          {
            label: "Scene",
            action: () => {},
          },
        ],
      },
    ],
  };

  const renderAction = (action: MenuAction) => {
    if (action.children) {
      return (
        <ContextMenuSub key={action.label}>
          <ContextMenuSubTrigger>
            {action.label}
          </ContextMenuSubTrigger>

          <ContextMenuSubContent>
            {action.children.map(renderAction)}
          </ContextMenuSubContent>
        </ContextMenuSub>
      );
    }

    return (
      <ContextMenuItem
        key={action.label}
        onClick={action.action}
      >
        {action.label}
      </ContextMenuItem>
    );
  };

  return (
    <ContextMenuContent>
      {Object.entries(menuActions).map(([category, actions], index) => (
        <div key={category}>
          {index > 0 && <ContextMenuSeparator />}
          <ContextMenuGroup>
            {actions.map(renderAction)}
          </ContextMenuGroup>
        </div>
      ))}
    </ContextMenuContent>
  );
}