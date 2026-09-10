import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  renderHook,
  waitFor,
} from "@testing-library/react";
import { restoreStory } from "../commands";
import { useRestoreStoryMutation } from "./useRestoreStoryMutation";
import { createWrapper } from "@/lib/testing-query-wrapper";
import { Story } from "../../types";
import { storyQueries } from "../querykeys";

vi.mock("../commands/restore-story.ts", () => ({
  restoreStory: vi.fn()
}));

beforeEach(() => {
  vi.resetAllMocks();
})

const stories: Story[] = [
  {
    storyId: "story-1",
    seriesId: "series-1",
    title: "story_1",
    isArchived: false,
    order: null,
    synopsis: "",
    coverImage: null,
    lastUpdated: new Date(),
    status: "draft",
    createdAt: new Date()
  },
  {
    storyId: "story-2",
    seriesId: "series-1",
    title: "story_2",
    isArchived: true,
    order: null,
    synopsis: "",
    coverImage: null,
    lastUpdated: new Date(),
    status: "draft",
    createdAt: new Date()
  },
];

describe("using the Restore Story Mutation", () => {
  it("calls the command with the right data", async () => {
    const mockRestore = {
      ...stories[1],
      isArchived: false
    }
    vi.mocked(restoreStory).mockResolvedValue(mockRestore);
    const { wrapper, queryClient } = createWrapper();
    const { result } = renderHook(
      () => useRestoreStoryMutation(),
      { wrapper }
    );

    queryClient.setQueryData(storyQueries.all, stories);

    await result.current.mutateAsync({
      storyId: "story-2"
    });
    expect(restoreStory).toHaveBeenCalledWith({
      storyId: "story-2"
    });
  })
  it("optimistically updates data in the cache", async () => {
    const { wrapper, queryClient } = createWrapper();
    const { result } = renderHook(
      () => useRestoreStoryMutation(),
      { wrapper }
    );

    queryClient.setQueryData(storyQueries.all, stories);
    await result.current.mutateAsync({
      storyId: "story-2"
    });
    const updatedStories = queryClient.getQueryData(storyQueries.all);

    expect(updatedStories).toEqual(
      stories.map((story) =>
        story.storyId === "story-2"
          ? { ...story, isArchived: false }
          : story
      )
    );
  })
  it("will rollback changes on error", async () => {
    const { wrapper, queryClient } = createWrapper();
    vi.mocked(restoreStory).mockRejectedValue(new Error("error"))
    const { result } = renderHook(
      () => useRestoreStoryMutation(),
      { wrapper }
    );

    queryClient.setQueryData(storyQueries.all, stories);
    await expect(result.current.mutateAsync({
      storyId: "story-2"
    })).rejects.toThrow();
    const updatedStories = queryClient.getQueryData(storyQueries.all);

    expect(updatedStories).toEqual(stories);
  })
  it("invalidates cache after the mutation settles", async () => {
    const { wrapper, queryClient } = createWrapper();
    const { result } = renderHook(
      () => useRestoreStoryMutation(),
      { wrapper }
    );

    
    const invalidateQueries = vi.spyOn(
      queryClient,
      "invalidateQueries"
    );


    queryClient.setQueryData(storyQueries.all, stories);
    await result.current.mutateAsync({
      storyId: "story-2"
    });
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: storyQueries.all
    });
  });
  
})