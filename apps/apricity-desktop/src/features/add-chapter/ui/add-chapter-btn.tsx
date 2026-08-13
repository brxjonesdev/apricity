import { useCreateChapterMutation } from "@/entities/chapter"
import { CreateChapterDTO } from "@/entities/chapter/api/dto/create-chapter.dto"
import { Button } from "@/shared/components/shadcn/button"

export default function AddChapterButton({storyId, index}: {storyId:string, index: number}) {
  const addChapter = useCreateChapterMutation()
  const handleClick = () => {
    const DEFAULT__NEW_CHAPTER: CreateChapterDTO = {
      title:`Chapter-${index}`,
      story_id: storyId,
      order: index,
      status: 0,
      synopsis: "",
      created_at: new Date().toDateString(),
      last_updated: new Date().toDateString()
    }
    addChapter.mutate({ input: DEFAULT__NEW_CHAPTER })
    console.log("hello?")
  }
  return (
    <Button variant={"ghost"} size={"xs"} onClick={handleClick}>
      + Add New Chapter
    </Button>
  )
}