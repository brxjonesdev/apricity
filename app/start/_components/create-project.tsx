"use client"

import { useState } from "react"
import { Button } from "@/lib/components/ui/button"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/lib/components/ui/dialog"
import { Input } from "@/lib/components/ui/input"
import { Textarea } from "@/lib/components/ui/textarea"

interface CreateProjectButtonProps {
  userId: string
  onCreate: (args: {
    userId: string
    name: string
    blurb?: string
  }) => Promise<{ success: boolean; error?: string }>
}

export default function CreateProjectButton({
  userId,
  onCreate,
}: CreateProjectButtonProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [blurb, setBlurb] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async () => {
    if (!name.trim()) return

    setLoading(true)
    setError(null)

    const result = await onCreate({
      userId,
      name: name.trim(),
      blurb: blurb.trim() || undefined,
    })

    setLoading(false)

    if (!result.success) {
      setError(result.error ?? "Failed to create project")
      return
    }

    // reset + close
    setOpen(false)
    setName("")
    setBlurb("")
  }

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-1" />
        New Project
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              autoFocus
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Textarea
              placeholder="Blurb (optional)"
              value={blurb}
              onChange={(e) => setBlurb(e.target.value)}
            />

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={loading || !name.trim()}
            >
              {loading ? "Creating…" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
