"use client";
import { ManuscriptWithChapters } from "@/lib/services/manuscript.service";
import {
  useContext,
  createContext,
  useState,
  useTransition,
  useMemo,
} from "react";

type ManuscriptContextType = {
  filteredManuscripts: ManuscriptWithChapters[];

  // selection methods
  activeManuscriptId?: number | null;
  setActiveManuscriptId: (id: number | null) => void;
  activeChapterId?: number | null;
  setActiveChapterId: (id: number | null) => void;
  activeSceneId?: number | null;
  setActiveSceneId: (id: number | null) => void;
  activeImageId?: number | null;
  setActiveImageId: (id: number | null) => void;

  // sidebar filtering
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const ManuscriptContext = createContext<ManuscriptContextType | null>(null);

export function ManuscriptProvider({
  initialData,
  children,
}: {
  initialData: ManuscriptWithChapters[];
  children: React.ReactNode;
}) {
  const [manuscripts, setManuscripts] =
    useState<ManuscriptWithChapters[]>(initialData);
  const [activeManuscriptId, setActiveManuscriptId] = useState<number | null>(
    initialData[0]?.id ?? null,
  );
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);
  const [activeSceneId, setActiveSceneId] = useState<number | null>(null);
  const [activeImageId, setActiveImageId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  function searchManuscript(
    manuscripts: ManuscriptWithChapters[],
    query: string,
  ) {
    const lowerQuery = query.toLowerCase();

    const results = manuscripts
      .map((manuscript) => {
        // Filter chapters that contain matching content
        const matchingChapters = manuscript.chapter.filter((chapter) => {
          return chapter.chapter_content.some((content) => {
            if (!content) return false;

            // Check scene content and title
            if (content.type === "scene" && content.scene) {
              const sceneMatch =
                content.scene.content?.toLowerCase().includes(lowerQuery) ||
                content.scene.display_title?.toLowerCase().includes(lowerQuery);
              return sceneMatch;
            }

            // Check image alt_text
            if (content.type === "image" && content.image) {
              const imageMatch =
                content.image.alt_text?.toLowerCase().includes(lowerQuery) ||
                content.image.display_title?.toLowerCase().includes(lowerQuery);
              return imageMatch;
            }

            return false;
          });
        });

        // Return manuscript with only matching chapters
        return {
          ...manuscript,
          chapter: matchingChapters,
        };
      })
      .filter((manuscript) => manuscript.chapter.length > 0);

    return results.length > 0 ? results : null;
  }

  const value: ManuscriptContextType = {
    filteredManuscripts: useMemo(() => {
      if (searchQuery.trim() === "") {
        return manuscripts;
      }
      const results = searchManuscript(manuscripts, searchQuery);
      return results ?? [];
    }, [manuscripts, searchQuery]),
    activeManuscriptId,
    setActiveManuscriptId,
    searchQuery,
    setSearchQuery,
    activeChapterId,
    setActiveChapterId,
    activeSceneId,
    setActiveSceneId,
    activeImageId,
    setActiveImageId,
  };
  return (
    <ManuscriptContext.Provider value={value}>
      {children}
    </ManuscriptContext.Provider>
  );
}

export function useManuscriptUI() {
  const context = useContext(ManuscriptContext);
  if (!context) {
    throw new Error("useManuscriptUI must be used within a ManuscriptProvider");
  }
  return context;
}
