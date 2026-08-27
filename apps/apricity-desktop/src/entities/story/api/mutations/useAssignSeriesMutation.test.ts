import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  renderHook,
  waitFor,
} from "@testing-library/react";
import { assignStoryToSeries } from "../commands";
import { useAssignSeriesMutation } from "./useAssignSeriesMutation";
import { createWrapper } from "@/lib/testing-query-wrapper";}

vi.mock("../commands/assign-series", () => ({
  assignStoryToSeries: vi.fn()
}));

beforeEach(() => {
  vi.clearAllMocks();
})

describe("using the AssignSeries Mutation", () => {
  it("calls the archive-story command with the right data", async () => {
  })
  it("optimistically archives the story in the cache", async () => {
    // removes story from old series, if there is one
    // adds story to target series
    // updates story's seriesId
  })
  it("will rollback changes on error", async () => {
  })
  it("invalidates stories after the mutation settles", async () => {
  });
  
})