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
  isPending: boolean;
  manuscripts: ManuscriptWithChapters[];
  filteredManuscripts: ManuscriptWithChapters[];
  activeManuscriptId: number | null;
  setActiveManuscriptId: (id: number | null) => void;

  // navigation functions
  scrollToChapter: (chapterId: string) => void;
  scrollToScene: (sceneId: string) => void;
  scrollToImage: (imageId: string) => void;
  scrollToTop: () => void;

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  console.log(manuscripts, "irene");

  const filterManuscripts = (
    manuscripts: ManuscriptWithChapters[],
    query: string,
  ) => {
    if (!query || query.trim() === "") return manuscripts;
    const lowerQuery = query.toLowerCase();
    return manuscripts.filter((manuscript) =>
      manuscript.title.toLowerCase().includes(lowerQuery),
    );
  };

  const scrollToChapter = (chapterId: string) => {
    return;
  };
  const scrollToScene = (sceneId: string) => {
    return;
  };
  const scrollToImage = (imageId: string) => {
    return;
  };
  const scrollToTop = () => {
    return;
  };

  const value: ManuscriptContextType = {
    manuscripts,
    filteredManuscripts: filterManuscripts(manuscripts, searchQuery),
    activeManuscriptId,
    setActiveManuscriptId,
    isPending,
    searchQuery,
    setSearchQuery,
    scrollToChapter,
    scrollToScene,
    scrollToImage,
    scrollToTop,
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
