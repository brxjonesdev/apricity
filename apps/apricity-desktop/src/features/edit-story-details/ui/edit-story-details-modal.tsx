import { CardHeader, CardTitle } from "@/shared/components/shadcn/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog"
import { EditStoryDetailsForm } from "./edit-details-form"

// edit-story-details-modal.tsx
type Props = {
  id: string
  title: string
  synopsis: string
  coverImage: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EditStoryDetails({
  id,
  title,
  synopsis,
  coverImage,
  open,
  onOpenChange,
}: Props) {

 
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <CardHeader>
          <CardTitle>
            Edit {title}
          </CardTitle>
        </CardHeader>
        <EditStoryDetailsForm
          key={id}
          storyId={id}
          title={title}
          synopsis={synopsis}
          coverImage={coverImage}
          closeModal={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}