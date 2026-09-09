import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  renderHook,
  waitFor,
} from "@testing-library/react";
import { createStory } from "../commands";
import { createWrapper } from "@/lib/testing-query-wrapper";
import { Story } from "../../types";
import { useCreateStoryMutation } from "./useCreateStoryMutation";
import { ActiveStoryProvider } from "@/app/layouts/contexts/active-story.context";
import { storyQueries } from "../querykeys";
import { CreateStoryDTO } from "../dto/create-story.dto";

vi.mock("../commands/create-story", () => ({
  createStory: vi.fn()
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

const newStory: Story = {
  storyId: "story-3",
  seriesId: "series-1",
  title: "story_2",
  isArchived: true,
  order: null,
  synopsis: "",
  coverImage: null,
  lastUpdated: new Date(),
  status: "draft",
  createdAt: new Date()
};
const mockStoryDTO: CreateStoryDTO = {
  seriesId: "",
  title: "story_2",
  synopsis: "",
  coverImage: "",
  genre: [],
};


describe("using the CreateSeries Mutation", () => {
  it("calls the command with the right data", async () => {
    vi.mocked(createStory).mockResolvedValue(newStory);

    const { wrapper, queryClient } = createWrapper([
      ActiveStoryProvider
    ]);
    const { result } = renderHook(
      () => useCreateStoryMutation(),
      { wrapper }
    );
     queryClient.setQueryData<Story[]>(storyQueries.all, stories)
    

  
    await result.current.mutateAsync(mockStoryDTO);

    expect(createStory).toHaveBeenCalledWith({
      seriesId: "",
      title: "story_2",
      synopsis: "",
      coverImage: "",
      genre: [],
    })
  })
  it("optimistically creates the story in the cache", async () => {
    const { wrapper, queryClient } = createWrapper([
      ActiveStoryProvider
    ]);
    const { result } = renderHook(
      () => useCreateStoryMutation(),
      { wrapper }
    );

    queryClient.setQueryData(storyQueries.all, stories);

    await result.current.mutateAsync(mockStoryDTO);

    await waitFor(() => {
      const cachedStories = queryClient.getQueryData<Story[]>(storyQueries.all);
      expect(cachedStories?.find(
        story => story.title === mockStoryDTO.title
      ))
    })
  })
  it("will rollback adding that story on error", async () => {
    const { wrapper, queryClient } = createWrapper([ActiveStoryProvider]);

    queryClient.setQueryData(storyQueries.all, stories);
    const { result } = renderHook(
      () => useCreateStoryMutation(),
      { wrapper }
    );
    vi.mocked(createStory).mockRejectedValue(new Error("something went wrong"));

    await expect(result.current.mutateAsync(mockStoryDTO)).rejects.toThrow();

    expect(queryClient.getQueryData(storyQueries.all)).toEqual(stories);
  })
  it("invalidates cache after the mutation settles", async () => {
    const { wrapper, queryClient } = createWrapper([ActiveStoryProvider]);

    const invalidateQueries = vi.spyOn(
      queryClient,
      "invalidateQueries"
    );
    queryClient.setQueryData(storyQueries.all, stories);
    vi.mocked(createStory).mockResolvedValue(newStory);

    const { result } = renderHook(
      () => useCreateStoryMutation(),
      { wrapper }
    );

    await result.current.mutateAsync(mockStoryDTO);

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: storyQueries.all
    })
  });
  
})