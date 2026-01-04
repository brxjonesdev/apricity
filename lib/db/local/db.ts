import { Dexie, type EntityTable } from "dexie"
import { Project } from "@/lib/features/projects/types"
import { FileSystemItem } from "../../features/file-system/types"

const db = new Dexie("FriendsDatabase") as Dexie & {
  projects: EntityTable<Project, "id">
  items: EntityTable<FileSystemItem, "id">
}

// Schema declaration:
db.version(1).stores({
  friends: "++id, name, age", // primary key "id" (for the runtime!)
  projects: "++id, userId, name, createdAt, updatedAt",
  items: "++id, userId, projectId, parentId, [parentId+order], createdAt *tags",
})


export { db }
