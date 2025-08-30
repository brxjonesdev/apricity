import { Character, Result, ok, err } from "@/lib/types";
import { EntityRepository } from "./entity.repository.index";
import { nanoid } from "nanoid";

export interface CharacterRepository extends EntityRepository<Character> {
  findByName(name: string): Result<Character | null, string>;
  searchByQuery(query: string): Result<Character[], string>;
  findByID(id: string): Result<Character | null, string>;
}

export function createInMemoryCharacterRepository(): CharacterRepository {
  const sampleCharacters: Character[] = [
    {
      id: "1", name: "Irene", description: "Leader, vocalist, dancer of Red Velvet.",
      projectId: "",
      type: "object",
      createdAt: new Date(),
      modifiedAt: new Date(),
      analytics: {
          entityId: "1",
          entityName: "Irene",
          entityType: "character",
          appearances: 10,
          totalWordsInvolved: 1000,
          documentsAppeared: ["doc1", "doc2"],
          relationshipCount: 5
      }
    },
    {
      id: "2", name: "Seulgi", description: "Main dancer, lead vocalist of Red Velvet.",
      projectId: "",
      type: "object",
      createdAt: new Date(),
      modifiedAt: new Date(),
      analytics: {
        entityId: "2",
        entityName: "Seulgi",
        entityType: "character",
        appearances: 8,
        totalWordsInvolved: 800,
        documentsAppeared: ["doc1", "doc3"],
        relationshipCount: 4
      }
    },
    {
      id: "3", name: "Wendy", description: "Main vocalist of Red Velvet.",
      projectId: "",
      type: "object",
      createdAt: new Date(),
      modifiedAt: new Date(),
      analytics: {
        entityId: "3",
        entityName: "Wendy",
        entityType: "character",
        appearances: 12,
        totalWordsInvolved: 1200,
        documentsAppeared: ["doc1", "doc4"],
        relationshipCount: 6
      }
    },
    {
      id: "4", name: "Joy", description: "Lead rapper, vocalist of Red Velvet.",
      projectId: "",
      type: "object",
      createdAt: new Date(),
      modifiedAt: new Date(),
      analytics: {
        entityId: "4",
        entityName: "Joy",
        entityType: "character",
        appearances: 9,
        totalWordsInvolved: 900,
        documentsAppeared: ["doc1", "doc5"],
        relationshipCount: 5
      }
    },
    {
      id: "5", name: "Yeri", description: "Maknae, rapper, vocalist of Red Velvet.",
      projectId: "",
      type: "object",
      createdAt: new Date(),
      modifiedAt: new Date(),
      analytics: {
        entityId: "5",
        entityName: "Yeri",
        entityType: "character",
        appearances: 7,
        totalWordsInvolved: 700,
        documentsAppeared: ["doc1", "doc6"],
        relationshipCount: 3
      }
    }
  ];

  return {
  findByName: (name: string) => {
    const character = sampleCharacters.find(c => c.name === name);
    return character ? ok(character) : err("Character not found");
  },
  searchByQuery: (query: string) => {
    const results = sampleCharacters.filter(c => c.name.includes(query));
    return ok(results);
  },
  findByID: (id: string) => {
    const character = sampleCharacters.find(c => c.id === id);
    return character ? ok(character) : err("Character not found");
  },
  async create(entity: Character): Promise<Result<Character, string>> {
    const id = `char_${nanoid(16)}`;
    entity.id = id;
    sampleCharacters.push(entity);
    return ok(entity);
  },
  async update(id: string, entity: Partial<Character>): Promise<Result<Character, string>> {
    const index = sampleCharacters.findIndex(c => c.id === id);
    if (index === -1) {
      return err("Character not found");
    }
    const updatedCharacter = { ...sampleCharacters[index], ...entity };
    sampleCharacters[index] = updatedCharacter;
    return ok(updatedCharacter);
  },
  async delete(id: string): Promise<Result<boolean, string>> {
    const index = sampleCharacters.findIndex(c => c.id === id);
    if (index === -1) {
      return err("Character not found");
    }
    sampleCharacters.splice(index, 1);
    return ok(true);
  },
  getById: function (id: string): Promise<Result<Character, string>> {
    const character = sampleCharacters.find(c => c.id === id);
    if (character) {
      return Promise.resolve(ok(character));
    } else {
      return Promise.resolve(err("Character not found"));
    }
  },
  getAllByProject: function (projectId: string): Promise<Result<Character[], string>> {
    const characters = sampleCharacters.filter(c => c.projectId === projectId);
    return Promise.resolve(ok(characters));
  }
}
}
