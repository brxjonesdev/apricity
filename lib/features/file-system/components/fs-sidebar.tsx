"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/lib/components/ui/sheet"
import { Separator } from "@/lib/components/ui/separator"
import { Menu } from "lucide-react"
import { Button } from "@/lib/components/ui/button"

export default function FSSidebar() {
  const [open, setOpen] = useState(false)

  const SidebarContent = () => (
    <>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Project Name</h2>
        <p className="text-sm text-muted-foreground">Project details and information go here.</p>
      </div>
      <Separator />
      <div className="mt-4">{/* <FileTree /> */}</div>
    </>
  )

  return (
    <>
      <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-border md:bg-sidebar md:text-sidebar-foreground md:p-6">
        <SidebarContent />
      </aside>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle>Project Name</SheetTitle>
            <SheetDescription>Project details and information go here.</SheetDescription>
          </SheetHeader>
          <Separator className="my-4" />
          <div>{/* <FileTree /> */}</div>
        </SheetContent>
      </Sheet>
    </>
  )
}
