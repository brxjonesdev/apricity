import { Button } from "@/shared/components/shadcn/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn/dialog"
import { useState } from "react"
import { cn } from "@/shared/utils"
import { AddSeriesForm } from "./add-series-form"
export default function AddSeriesButton({ children, className }: { children: React.ReactNode, className?: string}) {
const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`${cn(className)}`}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AddSeriesForm
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
  
}