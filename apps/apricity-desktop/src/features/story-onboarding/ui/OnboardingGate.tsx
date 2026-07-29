import { useState, useEffect } from "react";
import { useStoriesQuery } from "@/entities/story";
import StartModal from "./StartModal";

export default function StoryOnboardingGate({ children }: { children: React.ReactNode }) {
  const { data: stories, isLoading } = useStoriesQuery();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && stories?.length === 0) {
      setOpen(true);
    }
  }, [stories, isLoading]);

  return (
    <>
      {children}

      <StartModal open={open} onOpenChange={setOpen}/>
    </>
  );
}