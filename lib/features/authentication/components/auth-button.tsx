"use client";

import { Button } from "@/lib/components/ui/button";
import { ro } from "date-fns/locale";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const router = useRouter();
  function handleSignIn() {
    // Implement sign-in logic here
    router.push('/auth/signin');
  }

  return(
    <Button
      onClick={handleSignIn}
      variant="outline">Sign In</Button>
  )
}
