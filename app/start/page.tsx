import { Card, CardHeader, CardTitle, CardFooter } from "@/lib/components/ui/card";
import Link from "next/link";
export default async function StartPage() {
  return (
    <main className='flex min-h-screen flex-col p-6'>
      <section className="flex-1 w-full h-full flex justify-center items-center ">
        <Card className="flex-1 min-h-[35rem] max-w-4xl">
          <CardHeader>
          <CardTitle>Welcome to Apricity</CardTitle>
          </CardHeader>
          <CardFooter>
            <Link href="/workspace/project-1/user-1">
              Go to Workspace
            </Link>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}
