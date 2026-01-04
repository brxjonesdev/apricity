export default async function Workspace({params}: {
  params: Promise<{projectID: string, userID: string}>
}) {
  const { projectID, userID} = await params;
   return (
    <main className='flex min-h-screen flex-col p-6'>
      <section className="flex-1 w-full h-full flex justify-center items-center ">
        Workspace Page for project {projectID} and user {userID}
      </section>
    </main>
  )
}
