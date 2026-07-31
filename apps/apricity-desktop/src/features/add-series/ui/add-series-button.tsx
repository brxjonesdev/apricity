import { Button } from "@/shared/components/shadcn/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog"
import { cn } from "@/shared/utils"
import { AddStoryForm } from "../../add-story/ui/add-story-form";
export default function AddSeriesButton({ children, className }: { children: React.ReactNode, className?: string}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`${cn(className)}`}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        {/*<DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>*/}
      </DialogContent>
    </Dialog>
  )
  
}