
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/lib/components/ui/sheet"
import { Separator } from "@/lib/components/ui/separator"
import { Menu } from "lucide-react"
import { Button } from "@/lib/components/ui/button"

import {FileSystemTree} from "./file-tree"
import { createFileSystem } from "../index"
import { sampleFileSystemData } from "@/lib/utils"
import FileTreeClient from "./file-tree-client"
import { Card, CardHeader, CardContent } from "@/lib/components/ui/card"

export default async function FileSystemSidebar({
  project, user
}: {
  project: string
  user: string
}) {
  // const fileSystemService = createFileSystem(project, user)
  // const files = await fileSystemService.getAllItems()
  // if (!files.ok) {
  //   throw new Error("Failed to load files")
  // }
  // console.log("Files loaded in sidebar:", files.data)


  // const data = files.data
  const data = sampleFileSystemData // Temporary until backend is ready



  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:border-r w-64">
        <Card className="h-full py-0">
          <CardHeader className="pt-4">
            Menu stuff
          </CardHeader>
          <CardContent className="p-0 flex-1 rounded-b-lg overflow-hidden">
            <FileTreeClient files={data} projectId={project} userId={user} />
          </CardContent>
        </Card>
      </aside>

      {/* Mobile Sidebar */}
      <aside className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="m-4">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader>
              <SheetTitle className="p-4 text-lg font-bold">Files</SheetTitle>
              <Separator />
            </SheetHeader>
            <div className="p-4">
              {/*<FileSystemTree files={files} projectId={project} userId={user} />*/}
            </div>
          </SheetContent>
        </Sheet>
      </aside>
  </>
  )
}
