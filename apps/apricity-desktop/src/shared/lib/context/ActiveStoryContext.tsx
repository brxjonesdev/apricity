import { createContext, useContext, useState, ReactNode } from 'react';
import { useActiveEntity } from './ActiveEntityContext';

type ActiveStoryContextType = {
  activeStoryId: string | null;
  setActiveStoryId: (storyId: string | null) => void;
};

const ActiveStoryContext = createContext<ActiveStoryContextType | null>(null);

type ActiveStoryProviderProps = {
  children: ReactNode;
};

export function ActiveStoryProvider({ children }: ActiveStoryProviderProps) {
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);

  return (
    <ActiveStoryContext.Provider
      value={{
        activeStoryId,
        setActiveStoryId,
      }}
    >
      {children}
    </ActiveStoryContext.Provider>
  );
}

export function useActiveStory() {
  const context = useContext(ActiveStoryContext);

  if (!context) {
    throw new Error('useActiveStory must be used inside ActiveStoryProvider');
  }

  return context;
}
