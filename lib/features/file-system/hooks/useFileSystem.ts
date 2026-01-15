"use client"

import { Result, err, ok } from '@/lib/utils'
import { createFileSystem } from '..'
import { CreateFileSystemItemDTO, FileSystemItem } from '../types'
import { useState } from 'react'

interface UseFileSystemActions {
  items: FileSystemItem[]
  setItems: React.Dispatch<React.SetStateAction<FileSystemItem[]>>
  createFile: (parentId: FileSystemItem["parentId"]) => Promise<Result<FileSystemItem, string>>
  createFolder: (parentId: FileSystemItem["parentId"]) => Promise<Result<FileSystemItem, string>>
  deleteItem: (id: string) => Promise<Result<null, string>>
  renameItem: (id: string, newName: string) => Promise<Result<FileSystemItem, string>>
  moveItem: (id: string, newParentId: string | null | undefined) => Promise<Result<FileSystemItem, string>>
  togglePinItem: (id: string) => Promise<Result<FileSystemItem, string>>
}

export function useFileSystem({
  initialFiles,
  userId,
  projectId,
}: {
  initialFiles: FileSystemItem[]
  userId: string
  projectId: string
}): UseFileSystemActions {
  const fileSystemService = createFileSystem(userId, projectId)
  const [items, setItems] = useState<FileSystemItem[]>(initialFiles)


  async function createFile(parentId: FileSystemItem["parentId"]) {
    const newFile: CreateFileSystemItemDTO = {
      userId,
      projectId,
      name: 'New File',
      type: 'file',
      parentId: parentId,
      content: '',
      isPinned: false,
    }
    const result = await fileSystemService.createItem(newFile)
    if (!result.ok) {
      return err(result.error)
    }
    setItems((prevItems) => [...prevItems, result.data])
    return ok(result.data)
  }

  async function createFolder(parentId: FileSystemItem["parentId"]) {
    const newFolder: CreateFileSystemItemDTO = {
      userId,
      projectId,
      name: 'New Folder',
      type: 'folder',
      parentId: parentId,
      isPinned: false,
    }

    const tempId = `temp-${Date.now()}`
    const tempFolder: FileSystemItem = {
      ...newFolder,
      id: tempId,
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setItems((prevItems) => [...prevItems, tempFolder])
    const result = await fileSystemService.createItem(newFolder)
    if (!result.ok) {
      setItems((prevItems) => prevItems.filter(item => item.id !== tempId))
      return err(result.error)
    }

    setItems((prevItems) =>
      prevItems.map(item => item.id === tempId ? result.data : item)
    )
    return ok(result.data)

  }

  async function deleteItem(id: string) {
    const result = await fileSystemService.deleteItem(id)
    if (!result.ok) {
      return err(result.error)
    }
    setItems((prevItems) => prevItems.filter(item => item.id !== id))
    return ok(null)
  }

  async function renameItem(id: string, newName: string) {
    const result = await fileSystemService.updateItem(id, { name: newName })
    if (!result.ok) {
      return err(result.error)
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    )
    return ok(result.data)

  }

  async function moveItem(id: string, newParentId: string | null | undefined) {
    const result = await fileSystemService.updateItem(id, { parentId: newParentId })
    if (!result.ok) {
      return err(result.error)
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, parentId: newParentId } : item
      )
    )
    return ok(result.data)

  }

  async function togglePinItem(id: string) {
    const item = items.find(item => item.id === id)
    if (!item) {
      return err("Item not found")
    }
    const result = await fileSystemService.updateItem(id, { isPinned: !item.isPinned })
    if (!result.ok) {
      return err(result.error)
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isPinned: !item.isPinned } : item
      )
    )
    return ok(result.data)

  }

  return {
    items,
    setItems,
    createFile,
    createFolder,
    deleteItem,
    renameItem,
    moveItem,
    togglePinItem,
  }
}
