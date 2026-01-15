
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/lib/components/ui/sheet"
import { Separator } from "@/lib/components/ui/separator"
import { ArrowLeft, ArrowLeftIcon, FilePlus2, FolderPlusIcon, Menu } from "lucide-react"
import { Button } from "@/lib/components/ui/button"

import { createFileSystem } from "../index"
import { sampleFileSystemData } from "@/lib/utils"
import FileTreeClient from "./file-tree-client"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardAction } from "@/lib/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/lib/components/ui/tabs"
import { Menubar } from "@/lib/components/ui/menubar"
import { ButtonGroup } from "@/lib/components/ui/button-group"
import Link from "next/link"

export default async function FileSystemSidebar({
  project, user
}: {
  project: string
  user: string
}) {
  const fileSystemService = createFileSystem(user, project)
  const files = await fileSystemService.getAllItems()
  if (!files.ok) {
    throw new Error("Failed to load files")
  }
  console.log("Files loaded in sidebar:", files.data)


  const data = files.data




  return (
    <>
      <aside className="hidden md:flex md:flex-col  w-64">
        <Card className="h-full py-0 flex flex-col gap-0">
          <CardHeader className=" bg-black/70 py-4 px-2">
            <CardTitle>
              Project Name
            </CardTitle>
            <CardDescription className="text-xs">
              Manage your project files and settings
            </CardDescription>
            <CardAction  className="col-start-1">
              <Link href={"/start"}>
                <Button size={"icon"} variant={"outline"} className="size-6">
                  <ArrowLeftIcon/>
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <Separator />

          <CardContent className="flex-1 p-0 overflow-hidden">
            <Tabs defaultValue="files" className="flex-1 flex flex-col h-full rounded-b-lg p-2 ">
              <TabsList className="flex h-auto flex-col w-full gap-1 text-xs ">
                <TabsTrigger value="files" className="w-full  bg-black/70 text-xs">Files</TabsTrigger>
                <TabsTrigger value="plotweaver" className="w-full bg-black/70 text-xs">Plotweaver</TabsTrigger>
                <TabsTrigger value="worldbuilding" className="w-full bg-black/70 text-xs">Worldbuilding</TabsTrigger>
              </TabsList>
              <Separator />
              <TabsContent value="files" className="flex-1 p-0 pb-2 rounded-b-lg flex flex-col" >
                <FileTreeClient projectId={project} userId={user} files={data}/>

                </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </aside>
  </>
  )
}
