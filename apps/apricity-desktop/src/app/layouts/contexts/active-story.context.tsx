import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useLastOpenedStoryQuery } from "@/entities/story";

type ActiveStoryContextValue = {
  activeStoryId: string | undefined;
  setActiveStoryId: Dispatch<SetStateAction<string | undefined>>;
  isLoading: boolean;
};

const ActiveStoryContext = createContext<ActiveStoryContextValue | null>(null);

export function ActiveStoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: lastOpenedStoryId, isLoading } = useLastOpenedStoryQuery();
  console.log(lastOpenedStoryId, "storyIDtarget")
  const [activeStoryId, setActiveStoryId] = useState<string | undefined>();

  useEffect(() => {
    if (lastOpenedStoryId && !activeStoryId) {
      setActiveStoryId(lastOpenedStoryId);
    }
  }, [lastOpenedStoryId, activeStoryId]);

  return (
    <ActiveStoryContext.Provider
      value={{ activeStoryId, setActiveStoryId, isLoading }}
    >
      {children}
    </ActiveStoryContext.Provider>
  );
}

export function useActiveStory() {
  const context = useContext(ActiveStoryContext);

  if (!context) {
    throw new Error(
      "useActiveStory must be used within an ActiveStoryProvider"
    );
  }

  return context;
}