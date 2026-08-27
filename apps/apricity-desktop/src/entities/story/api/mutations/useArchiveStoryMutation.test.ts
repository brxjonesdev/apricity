import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  renderHook,
  waitFor,
} from "@testing-library/react";
import { archiveStory } from "../commands";
import { useArchiveStoryMutation } from "./useArchiveStoryMutation";
import { createWrapper } from "@/lib/testing-query-wrapper";
import { Story } from "../../types";
import { storyQueries } from "../querykeys";

vi.mock("../commands/archive-story", () => ({
  archiveStory: vi.fn(),
}))

beforeEach(() => {
  vi.clearAllMocks();
});

describe("using the Archive Story Mutation", () => {
  it("calls the archive-story command with the right data", async () => {
    vi.mocked(archiveStory).mockResolvedValue({
      storyId: "story-1",
      seriesId: "series-1",
      title: "story_1",
      isArchived: true,
      order: null,
      synopsis: "",
      coverImage: null,
      lastUpdated: new Date()
    });

    const { wrapper } = createWrapper();

    const {result} = renderHook(
      () => useArchiveStoryMutation(),
      { wrapper }
    );

    result.current.mutate({
      storyId: "story-1",
    })

    await waitFor(() => {
      expect(archiveStory).toHaveBeenCalledWith({
        storyId: "story-1"
      })
    })
  })
  it("optimistically archives the story in the cache", async () => {
    const { wrapper, queryClient } = createWrapper();
    const date = new Date

    const stories: Story[] = [
      {
        storyId: "story-1",
        seriesId: "series-1",
        title: "story_1",
        isArchived: false,
        order: null,
        synopsis: "",
        coverImage: null,
        lastUpdated: date
      },
      {
        storyId: "story-2",
        seriesId: "series-1",
        title: "story_2",
        isArchived: true,
        order: null,
        synopsis: "",
        coverImage: null,
        lastUpdated: date
      }
    ]

    queryClient.setQueryData(storyQueries.all, stories)

    vi.mocked(archiveStory).mockImplementation(() => new Promise(() => { }))

    const { result } = renderHook(
      () => useArchiveStoryMutation(),
      { wrapper }
    );

    result.current.mutate({
      storyId:"story-1"
    })

    await waitFor(() => {
      expect(result.current.isPending).toBe(true);
    });
  
    const cached = queryClient.getQueryData<Story[]>(
      storyQueries.all
    );
  
    expect(cached?.[0].isArchived).toBe(true);
  })
  it("will rollback changes on error", async () => {
    const { wrapper, queryClient } = createWrapper();
    const date = new Date

    const stories: Story[] = [
      {
        storyId: "story-1",
        seriesId: "series-1",
        title: "story_1",
        isArchived: false,
        order: null,
        synopsis: "",
        coverImage: null,
        lastUpdated: date
      },
      {
        storyId: "story-2",
        seriesId: "series-1",
        title: "story_2",
        isArchived: true,
        order: null,
        synopsis: "",
        coverImage: null,
        lastUpdated: date
      }
    ];

    queryClient.setQueryData(storyQueries.all, stories);

    vi.mocked(archiveStory).mockRejectedValue(
      new Error("Failed to archive story")
    )

    const { result } = renderHook(() => useArchiveStoryMutation(), { wrapper })

    result.current.mutate({
      storyId: "story-1"
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(
      queryClient.getQueryData(storyQueries.all)
    ).toEqual(stories)

    
    
  })
  it("invalidates stories after the mutation settles", async () => {
    const { wrapper, queryClient } = createWrapper();
  
    const invalidateQueries = vi.spyOn(queryClient, "invalidateQueries");
  
    vi.mocked(archiveStory).mockResolvedValue({
      storyId: "story-1",
      seriesId: "series-1",
      title: "story_1",
      isArchived: true,
      order: null,
      synopsis: "",
      coverImage: null,
      lastUpdated: new Date(),
    });
  
    const { result } = renderHook(
      () => useArchiveStoryMutation(),
      { wrapper }
    );
  
    result.current.mutate({
      storyId: "story-1",
    });
  
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: storyQueries.all,
    });
  });
})
