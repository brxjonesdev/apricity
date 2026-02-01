"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/lib/components/ui/alert-dialog";
import {
  MoreHorizontal,
  Trash2,
  Edit,
  FolderOpen,
  Calendar,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";
import { Badge } from "@/lib/components/ui/badge";
import { Database } from "@/lib/supabase/types";
import { useRouter } from "next/navigation";
import { useProject } from "@/lib/contexts/projectsContext";
import { Result } from "@/lib/utils";

type Project = Database["public"]["Tables"]["projects"]["Row"];

interface ProjectsListClientProps {
  projects: Project[];
  onDelete: (projectId: string) => Promise<Result<null, string>>;
}

export function ProjectsListClient({
  projects,
  onDelete,
}: ProjectsListClientProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    try {
      const result = await onDelete(projectToDelete.project_id);
      if (!result.ok) {
        console.error("Failed to delete project:", result.error);
        return;
      }
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleProjectClick = (projectId: string) => {
    const slug = projects
      .find((p) => p.project_id === projectId)
      ?.name.toLowerCase()
      .replace(/\s+/g, "-");
    router.push(`/nook/${projectId}`);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <FolderOpen className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No projects yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Start by creating your first project to begin writing your manuscript.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {projects.map((project) => (
          <Card
            key={project.project_id}
            className="group relative transition-all hover:shadow-md hover:border-primary/20 cursor-pointer"
            onClick={() => handleProjectClick(project.project_id)}
          >
            <CardHeader className="pb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-primary shrink-0" />
                  <CardTitle className="text-base font-semibold truncate">
                    {project.name}
                  </CardTitle>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Created {formatDate(project.created_at)}</span>
                  </div>
                  {project.updated_at &&
                    project.updated_at !== project.created_at && (
                      <Badge variant="secondary" className="text-xs">
                        Updated {formatDate(project.updated_at)}
                      </Badge>
                    )}
                </div>

                {project.blurb && (
                  <CardDescription className="line-clamp-2 text-sm mt-2">
                    {project.blurb}
                  </CardDescription>
                )}
              </div>

              <Button
                size="sm"
                variant="destructive"
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(project);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{projectToDelete?.name}&rdquo;
              </span>
              ? This action cannot be undone and all associated content will be
              permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Project"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
