import { BookOpen, Library, Bookmark, Clock } from "lucide-react"
import { Story } from "@/entities/story"

function formatRelative(date: Date): string {
  const diffMs = Date.now() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays <= 0) return "today"
  if (diffDays === 1) return "yesterday"
  if (diffDays < 30) return `${diffDays}d ago`
  const months = Math.floor(diffDays / 30)
  return `${months}mo ago`
}

export default function ActiveStory({ story }: { story: Story | undefined }) {
  if (!story) {
    return (
      <span className="flex min-w-0 items-center gap-2.5">
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-muted">
          <BookOpen className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </span>
        <span className="flex min-w-0 flex-col items-start">
          <span className="font-medium leading-tight">No active story</span>
          <span className="text-xs font-normal text-muted-foreground">Select a story to begin</span>
        </span>
      </span>
    )
  }



  return (
    <span className="flex min-w-0 flex-1 items-center justify-between gap-3 overflow-hidden py-1 text-left">
      {story.coverImage ? (
        <img
          src={story.coverImage || "/placeholder.svg"}
          alt={`Cover art for ${story.title}`}
          className="h-16 w-11 flex-shrink-0 rounded object-cover shadow-sm"
        />
      ) : (
        <span className="flex h-full w-11  flex-shrink-0 items-center justify-center rounded bg-muted">
          <BookOpen className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </span>
      )}

      <span className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 overflow-hidden">
        <span className="truncate font-medium leading-tight">{story.title}</span>
        {story.synopsis && (
          <span className="truncate text-xs font-normal leading-tight text-muted-foreground">
            {story.synopsis}
          </span>
        )}
      </span>
    </span>
  )
}
