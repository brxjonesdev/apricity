import { useTree } from "@headless-tree/react";
import {
  syncDataLoaderFeature,
  selectionFeature,
  hotkeysCoreFeature,
  dragAndDropFeature,
  renamingFeature,
  searchFeature
} from "@headless-tree/core";
import { Input } from "@/lib/components/ui/input";
import { Badge } from "@/lib/components/ui/badge";
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  Pin,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileSystemItem {
  id: string;
  userId: string;
  projectId: string;
  name: string;
  type: 'file' | 'folder';
  parentId: string | undefined | null;
  content?: string;
  size?: number;
  order: number;
  isPinned: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface FileSystemTreeProps {
  items: FileSystemItem[];
  rootId?: string;
  onRename?: (item: FileSystemItem, newName: string) => void;
  onMove?: (itemId: string, newParentId: string | null, newOrder: number) => void;
  onItemClick?: (item: FileSystemItem) => void;
}

export function FileSystemTree({
  items,
  rootId,
  onRename,
  onMove,
  onItemClick
}: FileSystemTreeProps) {
  const itemsById = Object.fromEntries(
    items.map(item => [item.id, item])
  );

  const actualRootId = rootId || '__root__';

  const tree = useTree<FileSystemItem>({
    rootItemId: actualRootId,

    getItemName: (item) => {
      if (item.getId() === actualRootId) return 'Root';
      return item.getItemData().name;
    },

    isItemFolder: (item) => {
      if (item.getId() === actualRootId) return true;
      return item.getItemData().type === 'folder';
    },

    dataLoader: {
      getItem: (itemId) => {
        if (itemId === actualRootId) {
          return {
            id: actualRootId,
            name: 'Root',
            type: 'folder',
            parentId: null,
            order: 0,
            isPinned: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          } as FileSystemItem;
        }
        return itemsById[itemId];
      },

      getChildren: (itemId) => {
        const children = items
          .filter(item => {
            if (itemId === actualRootId) {
              return !item.parentId || item.parentId === null;
            }
            return item.parentId === itemId;
          })
          .sort((a, b) => {
            if (a.isPinned !== b.isPinned) {
              return a.isPinned ? -1 : 1;
            }
            return a.order - b.order;
          });

        return children.map(child => child.id);
      },
    },

    onRename: onRename ? (item, newName) => {
      const data = item.getItemData();
      onRename(data, newName);
    } : undefined,

    onDrop: onMove ? (dropTarget) => {
      const draggedItems = dropTarget.draggedItems;
      const targetItem = dropTarget.target.item;

      draggedItems.forEach((draggedItem, index) => {
        const newParentId = targetItem.isFolder()
          ? targetItem.getId()
          : targetItem.getItemData().parentId || null;

        const newOrder = dropTarget.target.index + index;
        onMove(draggedItem.getId(), newParentId, newOrder);
      });
    } : undefined,

    onPrimaryAction: onItemClick ? (item) => {
      if (item.getId() !== actualRootId) {
        onItemClick(item.getItemData());
      }
    } : undefined,

    initialState: {
      expandedItems: [actualRootId],
    },

    indent: 20,

    features: [
      syncDataLoaderFeature,
      selectionFeature,
      hotkeysCoreFeature,
      ...(onMove ? [dragAndDropFeature] : []),
      ...(onRename ? [renamingFeature] : []),
      searchFeature,
    ],
  });

  return (
    <div className="w-full h-full flex flex-col bg-background">
      {/* Search Bar */}
      {tree.isSearchOpen() && (
        <div className="flex items-center gap-2 p-3 border-b bg-muted/50">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            {...tree.getSearchInputElementProps()}
            placeholder="Search files and folders..."
            className="h-8 text-sm"
          />
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {tree.getSearchMatchingItems().length} results
          </span>
        </div>
      )}

      {/* Tree Container */}
      <div
        {...tree.getContainerProps()}
        className="flex-1 overflow-auto focus:outline-none p-2"
      >
        {tree.getItems().map((item) => {
          const data = item.getItemData();
          const isRoot = item.getId() === actualRootId;

          if (isRoot) return null;

          const level = item.getItemMeta().level;

          return (
            <div key={item.getId()}>
              {item.isRenaming() ? (
                <div
                  className="flex items-center py-1 px-2"
                  style={{ paddingLeft: `${level * 20}px` }}
                >
                  <Input
                    {...item.getRenameInputProps()}
                    className="h-7 text-sm"
                  />
                </div>
              ) : (
                <button
                  {...item.getProps()}
                  className={cn(
                    "w-full flex items-center gap-1.5 py-1.5 px-2 rounded-md",
                    "text-sm text-left transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    item.isFocused() && "bg-accent text-accent-foreground ring-2 ring-ring",
                    item.isSelected() && "bg-primary/10 text-primary",
                    item.isMatchingSearch() && "bg-yellow-100 dark:bg-yellow-900/20",
                    item.isDragTarget() && "ring-2 ring-primary"
                  )}
                  style={{ paddingLeft: `${level * 20}px` }}
                >
                  {/* Expand/Collapse Icon */}
                  {item.isFolder() ? (
                    <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                      {item.isExpanded() ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-4 h-4" />
                  )}

                  {/* File/Folder Icon */}
                  {data.type === 'folder' ? (
                    <Folder className={cn(
                      "w-4 h-4 flex-shrink-0",
                      item.isExpanded() ? "text-blue-500" : "text-blue-400"
                    )} />
                  ) : (
                    <File className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                  )}

                  {/* Pinned Icon */}
                  {data.isPinned && (
                    <Pin className="w-3 h-3 flex-shrink-0 text-amber-500 fill-amber-500" />
                  )}

                  {/* Item Name */}
                  <span className="flex-1 truncate font-medium">
                    {item.getItemName()}
                  </span>


                </button>
              )}
            </div>
          );
        })}

        {/* Drag Line Indicator */}
        {onMove && (
          <div
            style={tree.getDragLineStyle()}
            className="absolute h-0.5 bg-primary rounded-full transition-all pointer-events-none"
          />
        )}
      </div>
    </div>
  );
}
