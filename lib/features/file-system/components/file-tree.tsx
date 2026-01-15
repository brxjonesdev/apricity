"use client";

import React, { useState } from "react";
import { FileSystemItem } from "../types";
import { TreeNode } from "./treenode/tree-node";
import { useFileSystem } from "../hooks/useFileSystem";
import { Result } from "@/lib/utils";

interface FileTreeProps {
  files: FileSystemItem[];
  onCreateFile: (parentId: FileSystemItem["parentId"]) => Promise<Result<FileSystemItem, string>>
  onCreateFolder: (parentId: FileSystemItem["parentId"]) => Promise<Result<FileSystemItem, string>>
  onRenameItem: (id: string, newName: string) => Promise<Result<FileSystemItem, string>>
  onDeleteItem: (id: string) => Promise<Result<null, string>>
}

export const FileSystemTree: React.FC<FileTreeProps> = ({ files, onCreateFile, onCreateFolder, onDeleteItem, onRenameItem }) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };






  const rootItems = files
    .filter(f => f.parentId == null)
    .sort((a, b) => a.order - b.order);

  return (
    <ul className="space-y-1 bg-cyan-950/5 flex-1">
      {rootItems.map(item => (
        <TreeNode
          key={item.id}
          item={item}
          files={files}
          expandedIds={expandedIds}
          onToggle={toggleExpand}
          onCreateFile={(parentId: string) => onCreateFile(parentId)}
          onCreateFolder={(parentId: string) => onCreateFolder(parentId)}
          onRenameItem={(id: string, newName: string) => onRenameItem(id, newName)}
          onDeleteItem={(id: string) => onDeleteItem(id)}
        />
      ))}
    </ul>
  );
};
