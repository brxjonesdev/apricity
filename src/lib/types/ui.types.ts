import { DocumentStatus } from "./document.types";

export interface DocumentTreeNode {
  id: string;
  title: string;
  type: DocumentType;
  status: DocumentStatus;
  wordCount: number;
  children: DocumentTreeNode[];
  isExpanded: boolean;
  isSelected: boolean;
}

export interface CorkboardCard {
  id: string;
  title: string;
  synopsis: string;
  status: DocumentStatus;
  wordCount: number;
  labels: string[];
  position: { x: number; y: number };
}