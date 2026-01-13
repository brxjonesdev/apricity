"use client"
import { Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle, } from "@/lib/components/ui/empty";
import { Button } from "@/lib/components/ui/button";
import { CreateProject } from "./create-project";
export default function EmptyProjects({id}:{id:string}){
  return (
    <Empty className="col-span-full ">
          <EmptyHeader>
            <EmptyTitle>No Projects Yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any projects yet. Get started by creating
              your first project.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <CreateProject id={id}/>
              <Button variant="outline" disabled>Import Project</Button>
            </div>
          </EmptyContent>
          <Button
            variant="link"
            asChild
            className="text-muted-foreground"
            size="sm"
          >

          </Button>
        </Empty>
  )
}
