import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  renderHook,
  waitFor,
} from "@testing-library/react";
import { removeStoryFromSeries } from "../commands/remove-series";
import { createWrapper } from "@/lib/testing-query-wrapper";import { useRemoveStoryFromSeriesMutation } from "./useRemoveStoryFromSeriesMutation";
import { storyQueries } from "../querykeys";
import { Story } from "../../types";

vi.mock("../commands/remove-series", () => ({
  removeStoryFromSeries: vi.fn()
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
describe("using the Remove Story from Series Mutation", () => {
  it("calls the command with the right data", async () => {
    const mockResult = {
      ...stories[0],
      seriesId: null
    }
    vi.mocked(removeStoryFromSeries).mockResolvedValue(mockResult);

    const { wrapper, queryClient } = createWrapper();
    const { result } = renderHook(() => useRemoveStoryFromSeriesMutation(), { wrapper });

    queryClient.setQueryData(storyQueries.all, stories);

    await result.current.mutateAsync({
      storyId: "story-1"
    });

    expect(removeStoryFromSeries).toHaveBeenCalledWith({
      storyId: "story-1"
    });
    
  })
  it("optimistically updates data in the cache", async () => {
    const { wrapper, queryClient } = createWrapper();
    const { result } = renderHook(
      () => useRemoveStoryFromSeriesMutation(),
      { wrapper }
    );

    queryClient.setQueryData(storyQueries.all, stories);

    await result.current.mutateAsync({
      storyId: "story-1"
    });

    await waitFor(() => {
      const cachedStories = queryClient.getQueryData<Story[]>(storyQueries.all);
      const targetStory = cachedStories?.find((s) => s.storyId === "story-1");
      expect(targetStory?.seriesId).toBeNull() 
    })
  })
  it("will rollback changes on error", async () => {
    const { wrapper, queryClient } = createWrapper();

    queryClient.setQueryData<Story[]>(storyQueries.all, stories);
    const { result } = renderHook(
      () => useRemoveStoryFromSeriesMutation(),
      { wrapper }
    );

    vi.mocked(removeStoryFromSeries).mockRejectedValue(new Error("Something went wrong.."));

    await expect(result.current.mutateAsync({
      storyId: "story-1"
    })).rejects.toThrow("Something went wrong..");

    await waitFor(() => {
      const cachedStories = queryClient.getQueryData<Story[]>(storyQueries.all);
      expect(cachedStories).toEqual(stories)
    })
  })
  it("invalidates cache after the mutation settles", async () => {
    const { wrapper, queryClient } = createWrapper();

    queryClient.setQueryData(storyQueries.all, stories);
    const { result } = renderHook(
      () => useRemoveStoryFromSeriesMutation(),
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
    })
  });
  
})