import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  renderHook,
  waitFor,
} from "@testing-library/react";
import { createStory } from "../commands";
import { useCreateChapterMutation } from "@/entities/chapter";
import { createWrapper } from "@/lib/testing-query-wrapper";}

vi.mock("../commands/create-story", () => ({
  createStory: vi.fn()
}));

beforeEach(() => {
  vi.clearAllMocks();
})

describe("using the CreateSeries Mutation", () => {
  it("calls the command with the right data", async () => {
  })
  it("optimistically updates data in the cache", async () => {

  })
  it("will rollback changes on error", async () => {
  })
  it("invalidates cache after the mutation settles", async () => {
  });
  
})