import FileSystemSidebar from "@/lib/features/file-system/components/sidebar";
export default async function WorkspaceLayout({
  children,
  params,
}: {
    children: React.ReactNode;
    params: { projectID: string; userID: string };
  }) {
  const { projectID, userID } = await params;
  return (
    <main className="flex min-h-screen  p-6">
      <FileSystemSidebar project={projectID} user={userID} />
      {children}
    </main>
  );
}
