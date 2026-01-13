
import { createFileSystem } from '@/lib/features/file-system';
export default async function WorkspaceHome({params}: {
  params: Promise<{projectID: string, userID: string}>
}) {
  const { projectID, userID } = await params;

  // check if user is authenticated and that userID matches session user id
  // if not, redirect to login page
  const fileSystemService = createFileSystem(userID, projectID);
  const files = await fileSystemService.getAllItems();
  console.log('Files in workspace home:', files);
   return (<>
     <section className='flex-1 p-4 flex'>


     </section>
   </>)
}
