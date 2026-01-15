"use client"
import { FileSystemItem } from '../types';
import { useFileSystem } from '../hooks/useFileSystem';
import {
  Card, CardContent,
} from '@/lib/components/ui/card';
import { Button } from '@/lib/components/ui/button';
import { ButtonGroup } from '@/lib/components/ui/button-group';
import { FilePlus2, FolderPlusIcon } from 'lucide-react';
import { FileSystemTree } from './file-tree';

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
  const {
    items,
    createFile,
    createFolder,
    renameItem,
    deleteItem
  } = useFileSystem({
    initialFiles: files,
    projectId,
    userId,
  });

  return (
    <>
      <ButtonGroup className="w-full mb-4">
        <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={async () => {
          await createFile(null);
        }}>
          <FilePlus2/> New File
        </Button>
        <Button size="sm" variant="outline" className="flex-1 text-xs"
          onClick={async () => {
            await createFolder(null);
          }}
        >
          <FolderPlusIcon/> New Folder
        </Button>
      </ButtonGroup>

      {items.length === 0 ? (
        <Card className="mt-4">
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No files or folders found. Use the buttons above to create new files or folders.
            </p>
          </CardContent>
        </Card>
      ) : (
        // Pass the reactive `items` and the create handlers to the tree
        <FileSystemTree files={items} onCreateFile={createFile} onCreateFolder={createFolder} onRenameItem={renameItem} onDeleteItem={deleteItem} />
      )}
    </>
  );
}
