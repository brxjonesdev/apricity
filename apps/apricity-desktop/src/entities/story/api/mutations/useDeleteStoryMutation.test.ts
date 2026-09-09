import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  renderHook,
  waitFor,
} from "@testing-library/react";
import { deleteStory } from "../commands";
import { createWrapper } from "@/lib/testing-query-wrapper";
import { Story } from "../../types";
import { storyQueries } from "../querykeys";
import { useDeleteStoryMutation } from "./useDeleteStoryMutation";

vi.mock("../commands/delete-story", () => ({
  deleteStory: vi.fn()
}));

beforeEach(() => {
  vi.resetAllMocks();
});

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

describe("using the DeleteSeries Mutation", () => {
  it("calls the command with the right data", async () => {
    vi.mocked(deleteStory).mockResolvedValue(true);

    const { wrapper, queryClient } = createWrapper();

    const { result } = renderHook(
      () => useDeleteStoryMutation(),
      {wrapper}
    )

    queryClient.setQueryData(storyQueries.all, stories);

    await result.current.mutateAsync({
      storyId: "story-1"
    });

    expect(deleteStory).toHaveBeenCalledWith({
      storyId: "story-1"
    });
  })
  it("optimistically deletes the story in the cache", async () => {
    const { wrapper, queryClient } = createWrapper();
    const { result } = renderHook(
      () => useDeleteStoryMutation(),
      { wrapper }
    );

    queryClient.setQueryData(storyQueries.all, stories);

    await result.current.mutateAsync({
      storyId: "story-1"
    });

    await waitFor(() => {
      const cachedStories = queryClient.getQueryData<Story[]>(storyQueries.all);
      expect(cachedStories).toHaveLength(1);
      expect(cachedStories).not.toContain(stories[0]);
    })
    
  })
  it("will rollback changes on error", async () => {
    const { wrapper, queryClient } = createWrapper();

    queryClient.setQueryData(storyQueries.all, stories);
    const { result } = renderHook(
      () => useDeleteStoryMutation(),
      { wrapper }
    );

    vi.mocked(deleteStory).mockRejectedValue(new Error("something went wrong"));

    await expect(result.current.mutateAsync({
      storyId: "story-1"
    })).rejects.toThrow("something went wrong");

    await waitFor(() => {
      const cachedStories = queryClient.getQueryData<Story[]>(storyQueries.all);
      expect(cachedStories).toHaveLength(2);
    })
  })
  it("invalidates cache after the mutation settles", async () => {
    const { wrapper, queryClient } = createWrapper();

    queryClient.setQueryData(storyQueries.all, stories);
    const { result } = renderHook(
      () => useDeleteStoryMutation(),
      { wrapper }
    );

    const invalidateQueries = vi.spyOn(
      queryClient,
      "invalidateQueries"
    );

    await result.current.mutateAsync({
      storyId: "story-1"
    });

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: storyQueries.all
    });

    
  });
  
})