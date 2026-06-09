import { useUpdateStory } from "../hooks/useUpdateStory";

export default function UpdateStory() {
  const { mutate, isPending } = useUpdateStory();
  return <div>Update Story</div>;
}
