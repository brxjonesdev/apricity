import { Button } from "@/shared/components/shadcn/button";
import { useCreateStory } from "../hooks/useCreateStory";
import { StoryCreate } from "../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog";
export default function CreateStory() {
  const { mutate, isPending, isError } = useCreateStory();

  function handleStoryCreate(input: StoryCreate): any {
    // TODO: Implement story creation logic
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isPending} className="w-full h-10" variant="outline">
          {isPending ? "Creating..." : "Create Story"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
