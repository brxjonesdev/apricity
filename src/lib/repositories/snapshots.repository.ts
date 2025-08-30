import { Snapshot } from "../types";

export interface SnapshotsRepository {
  createSnapshot(documentId: string): Promise<Snapshot>;
  getSnapshotById(id: string): Promise<Snapshot | null>;
  getAllSnapshots(): Promise<Snapshot[]>;
  deleteSnapshot(id: string): Promise<boolean>;
  findRecentSnapshots(documentId: string, limit: number): Promise<Snapshot[]>;
  exportSnapshot(id: string, format: 'json' | 'xml' | 'txt'): Promise<string>;
}
