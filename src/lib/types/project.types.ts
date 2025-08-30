export type Project = {
  id: string;
  name: string;
  blurb?: string;
  rootPath: string;
  createdAt: Date;
  updatedAt: Date;
  settings: ProjectSettings;
  analytics: ProjectAnalytics;
  theme: AppTheme;
}

export type ProjectCreate = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

export type ProjectUpdate = {
  id: string;
} & Partial<Omit<Project, 'id'>>;


export type ProjectSettings = {
  wordCountGoal?: number;
  defaultFormatting: 'plain' | 'markdown' | 'html';
  autosave: boolean;
  theme: 'light' | 'dark';
  editorPreferences: {
    fontSize: number;
    fontFamily: string;
    lineHeight: number;
    showWordCount: boolean;
    spellCheck: boolean;
    zenMode: boolean;
  };
}

export interface ProjectAnalytics {
  totalDocuments: number;
  totalWords: number;
  chaptersCount: number;
  scenesCount: number;
  charactersCount: number;
  locationsCount: number;
  averageWordsPerDocument: number;
  documentsModifiedToday: number;
  wordsWrittenToday: number;
  progressToGoal: number; // 0-1
}

export interface AppTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
}
