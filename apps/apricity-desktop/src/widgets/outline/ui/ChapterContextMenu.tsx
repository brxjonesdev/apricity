import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuLabel
} from "@/shared/components/shadcn/context-menu";
type Props = {
  chapterId: string;
  title: string
};

export default function ChapterContextMenu({chapterId, title}: Props) {
  return (
    <ContextMenuContent>
      <ContextMenuLabel>
        {title}
      </ContextMenuLabel>
      <ContextMenuSeparator />
      <ContextMenuItem>
        Add Scene
      </ContextMenuItem>
    
      <ContextMenuItem>
        Duplicate Chapter
      </ContextMenuItem>
    
      <ContextMenuSeparator />
    
      <ContextMenuItem className="text-destructive focus:text-destructive">
        Delete Chapter
      </ContextMenuItem>
    </ContextMenuContent>
  );
}