import { Button } from "@/shared/components/shadcn/button";
import { useCreateStory } from "../hooks/useCreateStory";
import { StoryCreate } from "../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog";
import StoryCreateForm from "./forms/create-story/story-create-form";
export default function CreateStory() {
  const { mutate, isPending, isError } = useCreateStory();

  const handleStoryCreate = (story: StoryCreate) => {
    mutate(story);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isPending} className="w-full h-10" variant="outline">
          {isPending ? "Creating..." : "Create Story"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create A New Story</DialogTitle>
          <DialogDescription>
            Create a new story or add to a series. In the future you will be
            able to import from other sources and use templates.
          </DialogDescription>
          <section>
            <StoryCreateForm onSubmit={handleStoryCreate} />
            {/*<StoryTransmutationRitual />*/}
            {/*<ApricityTemplates/>*/}
          </section>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isPending || isError}>Create Story</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
