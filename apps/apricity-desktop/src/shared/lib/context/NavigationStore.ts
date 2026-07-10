import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type View = 'editor' | 'outline' | 'characters' | 'world';

interface NavigationStore {
  view: View;
  navigateTo: (view: View) => void;
}

export const useNavigationStore = create<NavigationStore>()(
  persist(
    (set) => ({
      view: 'editor',
      navigateTo: (view) => set({ view }),
    }),
    { name: 'apricity-navigation' },
  ),
);
