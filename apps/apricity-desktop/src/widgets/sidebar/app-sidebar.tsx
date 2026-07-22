import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/shared/components/shadcn/sidebar';
import { Separator } from '@/shared/components/shadcn/separator';
import { StorySwitcher } from '@/features(old)/library/index';
import { useNavigationStore, View } from '@/shared/lib/context/NavigationStore';
import { BookOpen, List, Users, Globe } from 'lucide-react';
import { Button } from '@/shared/components/shadcn/button';
import Manuscript from '@/features(old)/structure/components/manuscript';

const NAV_ITEMS: { label: string; view: View; icon: React.ReactNode }[] = [
  { label: 'Manuscript', view: 'editor', icon: <BookOpen size={16} /> },
  { label: 'Outline', view: 'outline', icon: <List size={16} /> },
  { label: 'Characters', view: 'characters', icon: <Users size={16} /> },
  { label: 'World', view: 'world', icon: <Globe size={16} /> },
];

export function ApricityAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { view, navigateTo } = useNavigationStore();

  return (
    <Sidebar
      className='top-(--header-height) h-[calc(100svh-var(--header-height))]!'
      {...props}
    >
      <SidebarContent className='flex-1'>
        <SidebarGroup className='py-2'>
          <SidebarMenu className='flex flex-row gap-2'>
            {NAV_ITEMS.map(({ label, view: v, icon }) => (
              <SidebarMenuItem key={v} className='flex-1 flex justify-center'>
                <SidebarMenuButton
                  isActive={view === v}
                  onClick={() => navigateTo(v)}
                  asChild
                >
                  <Button
                    size='icon-lg'
                    variant={`${view === v ? 'ghost' : 'outline'}`}
                    className={`aspect-square h-12 ${view === v ? '!bg-cyan-400/20 !hover:bg-cyan-300 text-white' : ''}`}
                  >
                    {icon}
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <Separator />
        <Manuscript />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
