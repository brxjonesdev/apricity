export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-foreground" />
        <span className="sr-only">Loading...</span>
        <span className="text-sm text-muted-foreground">
          Loading project...
        </span>
      </div>
    </div>
  );
}
