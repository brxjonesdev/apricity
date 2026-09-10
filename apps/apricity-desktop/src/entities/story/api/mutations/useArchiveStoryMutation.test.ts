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

const mockArchivedStory: Story = {
  storyId: "story-1",
  seriesId: "series-1",
  title: "story_1",
  isArchived: true,
  order: null,
  synopsis: "",
  coverImage: null,
  lastUpdated: new Date(),
  status: "draft",
  createdAt: new Date()
};

describe("useArchiveStoryMutation", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("calls the archive-story command with the correct data", async () => {
    vi.mocked(archiveStory).mockResolvedValue(mockArchivedStory);

    const { wrapper } = createWrapper();

    const { result } = renderHook(
      () => useArchiveStoryMutation(),
      { wrapper }
    );

    await result.current.mutateAsync({
      storyId: "story-1",
    });

    expect(archiveStory).toHaveBeenCalledWith({
      storyId: "story-1",
    });
  });

  it("optimistically archives the story in the cache", async () => {
    const { wrapper, queryClient } = createWrapper();

    queryClient.setQueryData(storyQueries.all, stories);

    vi.mocked(archiveStory).mockImplementation(
      () => new Promise(() => {})
    );

    const { result } = renderHook(
      () => useArchiveStoryMutation(),
      { wrapper }
    );

    result.current.mutate({
      storyId: "story-1",
    });

    await waitFor(() => {
      const cached = queryClient.getQueryData<Story[]>(
        storyQueries.all
      );

      expect(cached?.find(
        story => story.storyId === "story-1"
      )?.isArchived).toBe(true);
    });
  });

  it("rolls back the cache when the mutation fails", async () => {
    const { wrapper, queryClient } = createWrapper();

    queryClient.setQueryData(storyQueries.all, stories);

    vi.mocked(archiveStory).mockRejectedValue(
      new Error("Failed to archive story")
    );

    const { result } = renderHook(
      () => useArchiveStoryMutation(),
      { wrapper }
    );

    await expect(
      result.current.mutateAsync({
        storyId: "story-1",
      })
    ).rejects.toThrow("Failed to archive story");

    expect(
      queryClient.getQueryData<Story[]>(storyQueries.all)
    ).toEqual(stories);
  });

  it("invalidates stories when the mutation settles", async () => {
    const { wrapper, queryClient } = createWrapper();

    const invalidateQueries = vi.spyOn(
      queryClient,
      "invalidateQueries"
    );

    vi.mocked(archiveStory).mockResolvedValue(mockArchivedStory);

    const { result } = renderHook(
      () => useArchiveStoryMutation(),
      { wrapper }
    );

    await result.current.mutateAsync({
      storyId: "story-1",
    });

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: storyQueries.all,
    });
  });
});


