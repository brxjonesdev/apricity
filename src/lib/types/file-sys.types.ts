export interface ExportOptions {
  format: 'markdown' | 'docx' | 'pdf' | 'txt' | 'json';
  includeMetadata: boolean;
  includeWorldbuilding: boolean;
  documentIds?: string[]; // If not provided, export all
  template?: string;
}

export interface ExportResult {
  success: boolean;
  filePath?: string;
  error?: string;
  fileSize?: number;
}

export interface FileChange {
  path: string;
  type: 'created' | 'modified' | 'deleted';
  timestamp: Date;
}

export interface Snapshot {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  snapshotPath: string;
  fileCount: number;
  totalWordCount: number;
  createdAt: Date;
}