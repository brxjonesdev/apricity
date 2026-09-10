import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  renderHook,
  waitFor,
} from "@testing-library/react";
import { useUpdateStoryMutation } from "./useUpdateStoryMutation";
import { updateStory } from "../commands";
import { createWrapper } from "@/lib/testing-query-wrapper";
import { Story } from "../../types";
import { storyQueries } from "../querykeys";
import { resourceLimits } from "worker_threads";

vi.mock("../commands/update-story", () => ({
  updateStory: vi.fn()
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

const mockUpdatedStory: Story = {
  ...stories[0],
  title: "Updated Title"
}


describe("using the UpdateStory Mutation", () => {
  it("calls the command with the right data", async () => {
    vi.mocked(updateStory).mockResolvedValue(mockUpdatedStory);

    const { wrapper, queryClient } = createWrapper();
    const { result } = renderHook(
      () => useUpdateStoryMutation(),
      { wrapper }
    );

    queryClient.setQueryData(storyQueries.all, stories);

    await result.current.mutateAsync({
      update: {
        id: "story-1",
        title: "Updated Title",
      }
    });

    expect(updateStory).toHaveBeenCalledWith({
      update: {
        id: "story-1",
        title: "Updated Title",
      }
    });
  })
  it("optimistically updates data in the cache", async () => {
    const { wrapper, queryClient } = createWrapper(); 
    const { result } = renderHook(
      () => useUpdateStoryMutation(),
      { wrapper }
    );

    queryClient.setQueryData(storyQueries.all, stories);

    queryClient.setQueryData(storyQueries.detail("story-1"), stories[0])

    await result.current.mutateAsync({
      update: {
        id: "story-1",
        title: "Updated Title",
      }
    });

    const updatedStories = queryClient.getQueryData<Story[]>(storyQueries.all);
    expect(updatedStories).toEqual(
      stories.map((story) =>
        story.storyId === "story-1"
          ? { ...story, title: "Updated Title" }
          : story
      )
    );
  })
  it("will rollback changes on error", async () => {
    vi.mocked(updateStory).mockRejectedValue(new Error("Mocked error"));

    const { wrapper, queryClient } = createWrapper();
    const { result } = renderHook(
      () => useUpdateStoryMutation(),
      { wrapper }
    );

    queryClient.setQueryData(storyQueries.all, stories);

    await expect(result.current.mutateAsync({
      update: {
        id: "story-1",
        title: "Updated Title",
      }
    })).rejects.toThrow();

    const cachedStories = queryClient.getQueryData<Story[]>(storyQueries.all);
    expect(cachedStories).toEqual(stories);
  })
  it("invalidates cache after the mutation settles", async () => {

    const { wrapper, queryClient } = createWrapper();
    const { result } = renderHook(
      () => useUpdateStoryMutation(),
      { wrapper }
    );

    const invalidateQueries = vi.spyOn(
      queryClient,
      "invalidateQueries"
    );

    await result.current.mutateAsync({
      update: {
        id: "story-1",
        title: "Updated Title",
      }
    });

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: storyQueries.all,
    });
  });
  
})