import { SettingsIcon } from "lucide-react";
import { Button } from "@/shared/components/shadcn/button";
import { useSidebar } from "@/shared/components/shadcn/sidebar";
import { StorySwitcher } from "@/features/library";

export function ApricityAppHeader() {
  const { toggleSidebar } = useSidebar();
  // This components needs the following
  // - Save Indicator
  // - Settings Button
  // - sync status

  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b bg-background justify-between">
      <StorySwitcher />

      <div className="p-2">
        <Button size={"icon-lg"} variant={"ghost"}>
          <SettingsIcon />
        </Button>
      </div>
    </header>
  );
}
