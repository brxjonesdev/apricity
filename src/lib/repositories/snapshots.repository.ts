import { nanoid } from "nanoid";
import { Snapshot, Result, ok, err } from "../types";

export interface SnapshotsRepository {
  createSnapshot(documentId: string, filePath: string, content: string, metadata: Record<string, any>): Promise<Result<Snapshot, string>>;
  getSnapshotById(id: string): Promise<Result<Snapshot, string>>;
  getAllSnapshots(): Promise<Result<Snapshot[], string>>;
  deleteSnapshot(id: string): Promise<Result<boolean, string>>;
  findRecentSnapshots(documentId: string, limit: number): Promise<Result<Snapshot[], string>>;
  importSnapshot(filePath: string): Promise<Result<Snapshot, string>>;
}

export function createInMemorySnapshotRepository(): SnapshotsRepository{
  const snapshots: Snapshot[] = [
    {
      id: '1',
      documentId: 'doc-1',
      createdAt: new Date(),
      data: {
        content: 'Snapshot content',
        metadata: {}
      },
      name: 'doc-1-snapshot-1',
      snapshotPath: '/path/to/snapshot-1'
    }
  ];

  return {
    async createSnapshot(documentId: string, filePath: string,) {
      const snapshot: Snapshot = {
        id: String(snapshots.length + 1),
        documentId,
        createdAt: new Date(),
        data: {
          content: '',
          metadata: {}
        },
        name: `${documentId}-snapshot-${nanoid(12)}`,
        snapshotPath: filePath,
      };
      snapshots.push(snapshot);
      return ok(snapshot);
    },

    async getSnapshotById(id: string) {
      const snapshot = snapshots.find(snapshot => snapshot.id === id);
      return snapshot ? ok(snapshot) : err('Snapshot not found');
    },

    async getAllSnapshots() {
      return ok(snapshots);
    },

    async deleteSnapshot(id: string) {
      const index = snapshots.findIndex(snapshot => snapshot.id === id);
      if (index !== -1) {
        snapshots.splice(index, 1);
        return ok(true);
      }
      return err('Snapshot not found');
    },

    async findRecentSnapshots(documentId: string, limit: number) {
      return ok(snapshots
        .filter(snapshot => snapshot.documentId === documentId)
        .slice(-limit));
    },

    async importSnapshot(filePath: string) {
      // find snapshot by file path
      const snapshot = snapshots.find(snapshot => snapshot.snapshotPath === filePath);
      if (!snapshot) {
        return err('Snapshot not found');
      }
      snapshots.push(snapshot);
      return ok(snapshot);
    }
  };
}
