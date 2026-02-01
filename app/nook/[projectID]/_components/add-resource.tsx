"use client";
import { Plus } from "lucide-react";
import { Button } from "@/lib/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/lib/components/ui/popover";
import { useManuscriptUI } from "@/lib/contexts/manuscript";
import { Separator } from "@/lib/components/ui/separator";
export default function AddResource() {
  // const { createManuscript, createChapter } = useManuscriptStructure();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon-sm"}>
          <Plus />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" sideOffset={16} className="w-48">
        <PopoverHeader>
          <PopoverTitle className="font-semibold">Create</PopoverTitle>
        </PopoverHeader>
        <Separator className="my-2" />
        <section className="flex flex-col text-xs gap-3">
          <Button
            variant="outline"
            // onClick={() => createManuscript()}
          >
            New Manuscript
          </Button>
          <Button
            variant="outline"
            className=""
            // onClick={() => createChapter()}
          >
            New Chapter
          </Button>
        </section>
      </PopoverContent>
    </Popover>
  );
}
