"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/dialog";
import { Button } from "@/lib/components/ui/button";
import { useProject } from "@/lib/contexts/projectsContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Settings() {
  const { project, deleteProject, updateProject, isPending } = useProject();
  const router = useRouter();
  const [editedData, setEditedData] = useState({
    name: project.name,
    blurb: project.blurb || "",
  });
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Project Settings</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Projects Settings</DialogTitle>
          <DialogDescription>
            Manage your project settings here.
          </DialogDescription>
        </DialogHeader>
        <section className="flex flex-col gap-4">
          <div>
            {/* Project Name and Blurb Setting */}
            <h2 className="font-semibold mb-2">Project Info</h2>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Project Name</label>
              <input
                type="text"
                defaultValue={editedData.name}
                onChange={(e) =>
                  setEditedData({ ...editedData, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <label className="text-sm font-medium">Project Blurb</label>
              <textarea
                defaultValue={editedData.blurb || ""}
                rows={3}
                className="resize-none"
                onChange={(e) =>
                  setEditedData({ ...editedData, blurb: e.target.value })
                }
              />
            </div>
            <Button
              className="mt-4"
              onClick={() => {
                updateProject({
                  name: editedData.name,
                  blurb: editedData.blurb || "",
                });
                setIsOpen(false);
              }}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
          <div className="border-t pt-4">
            {/* Delete Project Setting */}
            <h2 className="font-semibold mb-2 text-red-600">Delete Project</h2>
            <p className="text-sm text-muted-foreground mb-2">
              Deleting a project is irreversible. Please proceed with caution.
            </p>
            <Button
              variant="destructive"
              onClick={() => {
                deleteProject();
                router.push("/start");
              }}
            >
              Delete Project
            </Button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
