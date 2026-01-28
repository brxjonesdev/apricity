import { Card, CardHeader, CardTitle, CardFooter, CardContent } from "@/lib/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar"
import { Button } from "@/lib/components/ui/button"
import { ScrollArea } from "@/lib/components/ui/scroll-area"
import { ChevronDown, PlayCircle, Projector } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu"
import { getSupabaseUser } from "@/lib/supabase/utils";
import { createClient } from "@/lib/supabase/server";

export default async function StartPage() {
  const supabase = await createClient();
  const user = await getSupabaseUser(supabase);






  return (
    <main className='flex min-h-screen flex-col p-6'>

    </main>
  )
}
