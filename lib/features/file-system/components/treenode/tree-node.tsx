"use client"

import type React from "react"
import type { FileSystemItem } from "../../types"
import { ChevronDown, ChevronRight, File, Pin } from "lucide-react"
import { Button } from "@/lib/components/ui/button"
import Link from "next/link"
import type { Result } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/lib/components/ui/context-menu"

interface TreeNodeProps {
  item: FileSystemItem
  files: FileSystemItem[]
  expandedIds: Set<string>
  onToggle: (id: string) => void
  onCreateFile: (parentId: string) => Promise<Result<FileSystemItem, string>>;
  onCreateFolder: (parentId: string) => Promise<Result<FileSystemItem, string>>;
  onRenameItem: (id: string, newName: string) => Promise<Result<FileSystemItem, string>>;
  onDeleteItem: (id: string) => Promise<Result<null, string>>;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ item, files, expandedIds, onToggle, onCreateFile, onCreateFolder, onDeleteItem, onRenameItem }) => {
  const children = files.filter((f) => f.parentId === item.id).sort((a, b) => a.order - b.order)

  const isOpen = expandedIds.has(item.id)
  const isFolder = item.type === "folder"

  return (
    <li>
      <div className="flex items-center gap-0">
        <Button
          variant="ghost"
          size="sm"
          className="shrink-0 px-1"
          onClick={() => isFolder && onToggle(item.id)}
          disabled={!isFolder}
          aria-label={isFolder ? (isOpen ? "Collapse folder" : "Expand folder") : "File"}
        >
          {isFolder ? (
            isOpen ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )
          ) : (
            <File className="size-4 text-muted-foreground" />
          )}
        </Button>

        <ContextMenu>
          <ContextMenuTrigger asChild><Link href={`/workspace/${item.projectId}/${item.userId}/${item.id}`} className="flex-1 truncate w-full">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 justify-start px-2 font-normal text-foreground hover:text-foreground w-full"
            >
              <span className="truncate text-sm">{item.name}</span>
            </Button>
          </Link></ContextMenuTrigger>
          <ContextMenuContent>
            <p>
              For this item: {item.name} and type: {item.type} and id: {item.id}
            </p>
            {item.type === "folder" && (<>
              <ContextMenuItem onSelect={() => onCreateFile(item.id)}>
                New File
              </ContextMenuItem>
              <ContextMenuItem onSelect={() => onCreateFolder(item.id)}>
                New Folder
              </ContextMenuItem>
              <ContextMenuItem onSelect={() => onRenameItem(item.id, prompt("Enter new folder name:", item.name) || item.name)}>
                Rename Folder
              </ContextMenuItem>
            </>)}
            {item.type === "file" && (<>
              <ContextMenuItem onSelect={() => onRenameItem(item.id, prompt("Enter new file name:", item.name) || item.name)}>
                Rename File
              </ContextMenuItem>
            </>)}
            <ContextMenuItem onSelect={() => {
              if (confirm(`Are you sure you want to delete "${item.name}"? This action cannot be undone.`)) {
                onDeleteItem(item.id)
              }
            }}>
              Delete {item.type === "folder" ? "Folder" : "File"}
            </ContextMenuItem>
          {item.type === "folder" && (<>
            <ContextMenuItem onSelect={() => onToggle(item.id)}>
              {isOpen ? "Collapse Folder" : "Expand Folder"}
            </ContextMenuItem>
              </>)}
          </ContextMenuContent>
        </ContextMenu>


        {item.isPinned && <Pin className="shrink-0 size-4 text-muted-foreground mr-2" />}
      </div>

      {isFolder && isOpen && children.length > 0 && (
        <ul className="space-y-1 pl-4">
          {children.map((child) => (
            <TreeNode key={child.id} item={child} files={files} expandedIds={expandedIds} onToggle={onToggle}
              onCreateFile={onCreateFile} onCreateFolder={onCreateFolder}
              onDeleteItem={onDeleteItem} onRenameItem={onRenameItem}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
