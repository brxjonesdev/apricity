import FSSidebar from "@/lib/features/file-system/components/fs-sidebar";
export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex p-6">
      <FSSidebar />
      {children}
    </main>
  );
}
