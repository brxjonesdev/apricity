import { createContext, useContext, useState } from "react";
import { ManuscriptWithChapters } from "@/lib/services/manuscript.service";
import { Chapter, ChapterContent } from "@/lib/repositories/chapter.repo";

type ManuscriptContextType = {
  manuscripts: ManuscriptWithChapters[];
  isPending: boolean;

  //Selectors
  getManuscriptById: (id: number) => ManuscriptWithChapters | undefined;
  getChapterById: (id: number) => Chapter | undefined;
  getContentById: (id: number) => ChapterContent | undefined;
  // Manuscript operations
  addManuscript: () => void;
  deleteManuscript: (id: number) => void;
  renameManuscript: (id: number, newTitle: string) => void;
  duplicateManuscript: (manuscriptId: number) => void;
  repositionManuscript: (manuscriptId: number, newPosition: number) => void;

  // Chapter operations
  addChapterToManuscript: (manuscriptId: number) => void;
  renameChapter: (chapterId: number, newTitle: string) => void;
  deleteChapter: (chapterId: number) => void;
  repositionChapter: (chapterId: number, newPosition: number) => void;
  duplicateChapter: (chapterId: number) => void;

  // Content operations
  addSceneToChapter: (chapterId: number) => void;
  addImageToChapter: (chapterId: number) => void;
  deleteContent: (contentId: number) => void;
  repositionContent: (
    contentId: number,
    newPosition: number,
    newParentId?: number,
  ) => void;

  // Content editing
  updateScene: (
    sceneId: number,
    content: string,
    displayTitle?: string,
  ) => void;
};

const ManuscriptContext = createContext<ManuscriptContextType | null>(null);
