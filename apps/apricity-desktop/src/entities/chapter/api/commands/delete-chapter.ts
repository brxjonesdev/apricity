import { USE_MOCKS } from "@/shared/config/env";
import { mockChapters } from "../../mockdata";
import { call } from "@/shared/lib/api/tauriClient"
export async function deleteChapter(chapterId: string): Promise<boolean>{

  if (USE_MOCKS) {
    const index = mockChapters.findIndex((chapter) => chapter.id === chapterId);
    mockChapters.splice(index, 1);
      return true;
  }

  const res = await call<boolean>("delete_chapter", { chapter_id: chapterId });
  if (!res.ok) {
    throw new Error(res.error);
  }
  return res.data
}
