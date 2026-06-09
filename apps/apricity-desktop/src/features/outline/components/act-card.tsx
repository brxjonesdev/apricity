import { Act } from "../types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/shadcn/card";

export default function ActCard({ act }: { act: Act }) {
  return (
    <Card className="w-full gap-0">
      <CardHeader>
        <CardTitle>Act #{act.order}</CardTitle>
      </CardHeader>
      <CardContent>{act.summary}</CardContent>
    </Card>
  );
}
