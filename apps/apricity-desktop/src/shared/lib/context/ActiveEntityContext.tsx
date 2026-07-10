import { createContext, useContext, useState, ReactNode } from 'react';

type EntityType =
  | 'character'
  | 'relationship'
  | 'group'
  | 'location'
  | 'event'
  | 'act'
  | 'plot_point'
  | 'chapter'
  | 'scene'
  | 'note';

type ActiveEntityContextType = {
  activeEntity: {
    activeEntityId: string;
    activeEntityType: EntityType;
    activeEntityParentId: string | null;
  } | null;
  setActiveEntity: (
    entity: {
      activeEntityId: string;
      activeEntityType: EntityType;
      activeEntityParentId: string | null;
    } | null,
  ) => void;
  clearActiveEntity: () => void;
};

const ActiveEntityContext = createContext<ActiveEntityContextType | null>(null);

type ActiveStoryProviderProps = {
  children: ReactNode;
};

export function ActiveEntityProvider({ children }: ActiveStoryProviderProps) {
  const [activeEntity, setActiveEntity] = useState<{
    activeEntityId: string;
    activeEntityType: EntityType;
    activeEntityParentId: string | null;
  } | null>(null);

  function clearActiveEntity() {
    setActiveEntity(null);
  }
  return (
    <ActiveEntityContext.Provider
      value={{
        activeEntity,
        setActiveEntity,
        clearActiveEntity,
      }}
    >
      {children}
    </ActiveEntityContext.Provider>
  );
}

export function useActiveEntity() {
  const context = useContext(ActiveEntityContext);

  if (!context) {
    throw new Error('useActiveStory must be used inside ActiveStoryProvider');
  }

  return context;
}
