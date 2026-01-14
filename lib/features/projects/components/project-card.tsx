import { Project } from "../types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  userID: string;

}
export default function ProjectCard({ project, userID}: ProjectCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{project.blurb}</p>
      </CardContent>
      <CardFooter>
        <Link href={`workspace/${project.id}/${userID}`} className="w-full">
          <Button variant="secondary" size="sm" className="px-2 w-full">
            Continue Working
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
