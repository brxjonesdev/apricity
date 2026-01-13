"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "@/lib/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/dialog"
import { Input } from "@/lib/components/ui/input"
import { Label } from "@/lib/components/ui/label"
import { Textarea } from "@/lib/components/ui/textarea"
import { Plus, Loader2 } from "lucide-react"
import { createProjectService } from ".."

export function CreateProject({id}:{id:string}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [blurb, setBlurb] = useState("")

  async function createProject(name: string, blurb: string) {
    const projectsService = createProjectService(id)
    const response = await projectsService.createProject({
      userId: id,
      name,
      blurb
    })
    if (!response.ok) {
      console.error("Failed to create project", response.error)
      throw new Error("Failed to create project", { cause: response.error } )
    }
    return response.data
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createProject(name, blurb)
      setOpen(false)
      setName("")
      setBlurb("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Create New Project
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Give your project a name and a short description to get started.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. My Awesome App"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="blurb">Description (Optional)</Label>
              <Textarea
                id="blurb"
                value={blurb}
                onChange={(e) => setBlurb(e.target.value)}
                placeholder="A brief overview of your project..."
                className="resize-none h-24"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !name.trim()}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
