import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog";
import { Button } from "@/shared/components/shadcn/button";
import { useStories } from "../hooks/useStories";
export default function CreateSeries() {
  // const { mutate, isPending, isError } = useCreateSeries();
  const { data, isLoading } = useStories();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full h-10" variant={"secondary"}>
          Create Series
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
