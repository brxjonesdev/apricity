import { Button } from "@/shared/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog";
import { LucideArchive } from "lucide-react";
import { useState } from "react";
import { useArchiveStory } from "../hooks/useArchiveStory";
export default function ArchiveStoryButton({
  storyId,
  title,
}: {
  storyId: string;
  title: string;
}) {
  const {} = useArchiveStory(storyId);
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="h-10 w-10" size={"icon-lg"}>
          <LucideArchive />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Archive {title}?</DialogTitle>
          <DialogDescription>
            Are you sure? This will archive the story and remove it from your
            dashboard. You can always unarchive it later or fully delete your
            project from the archive if needed.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
