import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  renderHook,
} from "@testing-library/react";
import { assignStoryToSeries } from "../commands";
import { useAssignSeriesMutation } from "./useAssignSeriesMutation";
import { createWrapper } from "@/lib/testing-query-wrapper";
import {StoryInSeries, Story } from "../../types";
import { storyQueries } from "../querykeys";


vi.mock("../commands/assign-series", () => ({
  assignStoryToSeries: vi.fn()
}));

const mockStoryInSeries: StoryInSeries[] = [{
  storyId: "1",
  seriesId: "series_1",
  order: "1",
  title: "all i need",
  synopsis: "hello",
  coverImage: null,
  lastUpdated: new Date,
  isArchived: false
}]

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
  },
  {
    storyId: "story-2",
    seriesId: "",
    title: "story_2",
    isArchived: true,
    order: null,
    synopsis: "",
    coverImage: null,
    lastUpdated: new Date(),
  },
  {
    storyId: "story-3",
    seriesId: "series-3",
    title: "story_2",
    isArchived: true,
    order: null,
    synopsis: "",
    coverImage: null,
    lastUpdated: new Date(),
  },
];

describe("using the AssignSeries Mutation", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  })
  it("calls the assign-series command with the right data", async () => {
   
    vi.mocked(assignStoryToSeries).mockResolvedValue(mockStoryInSeries[0])

    const { wrapper, queryClient } = createWrapper();

    const { result } = renderHook(
      () => useAssignSeriesMutation(),
      {wrapper}
    )

    queryClient.setQueryData(storyQueries.all, stories)
    
    await result.current.mutateAsync({
      storyId: "story-1",
      seriesId: "series_1",
    })

    expect(assignStoryToSeries).toHaveBeenCalledWith({
      storyId: "story-1",
      seriesId: "series_1",
      order: expect.any(String)
    })
  })
  it("optimistically adds the story to the destination series", async () => {
    const { wrapper, queryClient } = createWrapper();
  
    const { result } = renderHook(
      () => useAssignSeriesMutation(),
      { wrapper }
    );
  
    // All stories cache
    queryClient.setQueryData<Story[]>(
      storyQueries.all,
      stories
    );
  
    // Destination series cache starts empty
    queryClient.setQueryData<StoryInSeries[]>(
      storyQueries.bySeries("series_1"),
      []
    );
  
    await result.current.mutateAsync({
      storyId: "story-1",
      seriesId: "series_1",
    });
  
    const cached = queryClient.getQueryData<StoryInSeries[]>(
      storyQueries.bySeries("series_1")
    );
  
    expect(
      cached?.find((story) => story.storyId === "story-1")
    ).toMatchObject({
      storyId: "story-1",
      seriesId: "series_1",
    });
  });
  it("optimistically updates the story's seriesId in the stories cache", async () => {
    const { wrapper, queryClient } = createWrapper();
  
    const { result } = renderHook(
      () => useAssignSeriesMutation(),
      { wrapper }
    );

    queryClient.setQueryData<Story[]>(storyQueries.all, stories);

    await result.current.mutateAsync({
      storyId: "story-2",
      seriesId: "series_1"
    })

    const cachedStories = queryClient.getQueryData<Story[]>(storyQueries.all);
    const cachedStory = cachedStories?.find(
      story => story.storyId === "story-2"
    );
    expect(cachedStory?.seriesId).toBe("series_1");

    
  });
  it("optimistically removes the story from its previous series", async () => {
    const { wrapper, queryClient } = createWrapper();
  
    const { result } = renderHook(
      () => useAssignSeriesMutation(),
      { wrapper }
    );
    queryClient.setQueryData<Story[]>(storyQueries.all, stories);
    
    await result.current.mutateAsync({
      storyId: "story-3",
      seriesId: "series_1"
    })

    const cachedStories = queryClient.getQueryData<Story[]>(storyQueries.all);
    const targetCachedStory = cachedStories?.find(
      (story) => story.storyId == "story-3"
    );

    expect(targetCachedStory?.seriesId).toBe("series_1");
    expect(targetCachedStory?.seriesId).not.toBe("series_2");
    expect(targetCachedStory?.seriesId).not.toBe("series_3");
  });
  it("will rollback changes on error", async () => {
    const { wrapper, queryClient } = createWrapper();
    queryClient.setQueryData(storyQueries.all, stories);

    vi.mocked(assignStoryToSeries).mockRejectedValue(
      new Error("Failed to update stories seriesID...")
    );

    const { result } = renderHook(
      () => useAssignSeriesMutation(),
      { wrapper }
    );

    await expect(
      result.current.mutateAsync({
        storyId: "story-1",
        seriesId: "series_1"
      })
    ).rejects.toThrow(
      "Failed to update stories seriesID..."
    );

    expect(
      queryClient.getQueryData<Story[]>(storyQueries.all)
    ).toEqual(stories);

  });
  it("invalidates stories after the mutation settles", async () => {
    const { wrapper, queryClient } = createWrapper();

    const invalidateQueries = vi.spyOn(
      queryClient,
      "invalidateQueries"
    );

    const { result } = renderHook(
      () => useAssignSeriesMutation(),
      { wrapper }
    );

    queryClient.setQueryData<Story[]>(
       storyQueries.all,
       stories
     );

    queryClient.setQueryData<StoryInSeries[]>(
        storyQueries.bySeries("series_1"),
        []
      );

    await result.current.mutateAsync({
      storyId: "story-1",
      seriesId: "series_1"
    });

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: storyQueries.all,
    });

    
  });
  
})