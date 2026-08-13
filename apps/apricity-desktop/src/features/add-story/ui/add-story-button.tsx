import { useState } from "react";
import { Button } from "@/shared/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog";
import { cn } from "@/shared/utils";
import { AddStoryForm } from "@/shared/forms/add-story-form"

export default function AddStoryButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(className)}>
          {children}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <AddStoryForm
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}