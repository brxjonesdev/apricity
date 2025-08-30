export type DocumentType = 'folder' | 'chapter' | 'scene' | 'note' | 'character_sheet' | 'research';
export type DocumentStatus = 'outline' | 'first_draft' | 'revision' | 'final' | 'archived';

export interface Document{
    id: string;
    projectID: string;
    filePath: string;
    parentID?: string;
    title: string;
    type: DocumentType;
    status: DocumentStatus;
    wordCount: number;
    orderIndex: number;
    labels: string[];
    metadata: DocumentMetadata;
    createdAt: Date;
    updatedAt: Date;
    contentHash: string;
}

export interface DocumentMetadata {
    pov?: string;
    primaryLocation?: string;
    viewpoint?: string;
    synopsis?: string;
    notes?: string;
    // Custom fields
    [key: string]: any;
}

export interface DocumentFrontmatter {
  id: string;
  title: string;
  type: DocumentType;
  status: DocumentStatus;
  wordCount?: number;
  parentId?: string;
  orderIndex?: number;
  labels?: string[];
  metadata?: DocumentMetadata;
  linkedEntities?: LinkedEntities;
  notes?: string;
}

export interface LinkedEntities {
  characters?: string[];
  locations?: string[];
  themes?: string[];
  plotThreads?: string[];
  [entityType: string]: string[] | undefined;
}