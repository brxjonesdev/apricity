import UpdateSeriesDetails from "@/features/update-series/ui/update-details"
import UpdateSeriesStoryGrid from "@/features/update-series/ui/update-grid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadcn/card"
import { DialogContent } from "@/shared/components/shadcn/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/shadcn/tabs"

export default function SeriesMenu({ title, desc, id, onSuccess }: { title: string, desc: string, id: string, onSuccess: () => void }) {
  return (
    <DialogContent className="min-w-96 p-1" showCloseButton={false}>
      <Card>
        <CardHeader>
          <CardTitle>
            Update {title}
          </CardTitle>

          <CardDescription>
            Manage the series details and organize its stories.
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="details">
                Details
              </TabsTrigger>

              <TabsTrigger value="grid">
                Stories
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <UpdateSeriesDetails
                title={title}
                desc={desc}
                id={id}
                onSuccess={onSuccess}
              />
            </TabsContent>

            <TabsContent value="grid">
              <UpdateSeriesStoryGrid
                id={id}
                onSuccess={onSuccess}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DialogContent>
  );
}