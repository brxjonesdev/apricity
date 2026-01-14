"use client"

import { useState } from 'react';
import { FileSystemItem } from '../types';
import { FileSystemTree } from '../components/file-tree';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/lib/components/ui/card';
export default function FileTreeClient(
  {
    files,
    projectId,
    userId,
  }: {
    files: FileSystemItem[];
    projectId: string;
    userId: string;
  }
) {
  const [items, setItems] = useState<FileSystemItem[]>(
    files
  );

  const handleRename = (item: FileSystemItem, newName: string) => {
    setItems(prev => prev.map(i =>
      i.id === item.id ? { ...i, name: newName, updatedAt: new Date() } : i
    ));
  };

  const handleMove = (itemId: string, newParentId: string | null, newOrder: number) => {
    setItems(prev => prev.map(i =>
      i.id === itemId
        ? { ...i, parentId: newParentId, order: newOrder, updatedAt: new Date() }
        : i
    ));
  };

  const handleItemClick = (item: FileSystemItem) => {
      console.log('Clicked:', item);
    };

  return (
    <FileSystemTree
      items={items}
      onRename={handleRename}
      onMove={handleMove}
      onItemClick={handleItemClick}
    />
  );
}
