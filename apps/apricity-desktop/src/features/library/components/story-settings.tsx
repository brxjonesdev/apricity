import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog";
import { Button } from "@/shared/components/shadcn/button";
import { useStory } from "../hooks/useStory";
import { useState } from "react";
import { SettingsIcon } from "lucide-react";
export default function StorySettings({ id }: { id: string }) {
  const { data, isLoading, error } = useStory(id);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="h-10 w-10" size={"icon-lg"}>
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : data ? (
          <>
            <DialogHeader>
              <DialogTitle>Settings for {data?.title}</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
