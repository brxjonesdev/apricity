import UpdateSeriesDetails from "@/features/update-series/ui/update-details"
import UpdateSeriesStoryGrid from "@/features/update-series/ui/update-grid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcn/card"
import { ContextMenuContent, ContextMenuItem } from "@/shared/components/shadcn/context-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/shadcn/tabs"
import { FolderDetailsIcon } from "@hugeicons/core-free-icons"
export default function SeriesContextMenu({ title }: {
  title: string
}) {
  return (
    // adjust postionn later
    <ContextMenuContent asChild>
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle>
            Update Series {title}
          </CardTitle>
          <CardDescription>
            Update series title, change positions, and add/ remove
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details">
                {/*<UpdateSeriesDetails/>*/}
              </TabsTrigger>
              <TabsTrigger value="grid">
               <UpdateSeriesStoryGrid/>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              
            </TabsContent>
            <TabsContent value="grid">
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ContextMenuContent>
  )
}