import Image from 'next/image';
import { db } from '@/lib/db/local/db';
import StartMenu from '@/lib/features/projects/components/start-menu';
import AuthButton from '@/lib/features/authentication/components/auth-button';

export default async function LandingPage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {/* Hero Section */}
      <section>
        <AuthButton/>
      </section>
      {/* Features Section */}
      <section>

      </section>
    </main>
  )
}
