"use client";

import { Button } from "@/lib/components/ui/button";
import Link from "next/link";

export default function AuthButton({text, classname }: {text?: string, classname?: string}) {
  return (
    <Link href="/auth/signin">
    <Button
      className={`${classname ? classname : ''}`}
      variant="default">
        {text ? text : 'Sign In'}
      </Button>
    </Link>
  )
}
