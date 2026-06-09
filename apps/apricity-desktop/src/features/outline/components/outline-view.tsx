import { useActiveStory } from "@/shared/context/ActiveStoryContext";
import { useActsWithPlotPoints } from "../hooks/queries/useActsWithPlotPoints";
import { useActs } from "../hooks/queries/useActs";
import ActCard from "./act-card";

export default function OutlineView() {
  const { activeStoryId } = useActiveStory();
  const { data: acts, isLoading: actsLoading } = useActs(activeStoryId);
  const { data: actsWithPlotPoints, isLoading: actsWithPlotPointsLoading } =
    useActsWithPlotPoints(activeStoryId);
  return (
    <section className="flex">
      <aside className="flex flex-col w-[14rem] shrink-0 border-r p-2">
        <div className="">Acts</div>
        <div className="flex flex-col gap-4">
          {acts && acts.map((act) => <ActCard key={act.id} act={act} />)}
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto px-10 py-6"></main>
    </section>
  );
}
