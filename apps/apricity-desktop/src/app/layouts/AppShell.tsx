import { Outlet } from 'react-router';
import { SidebarProvider,SidebarInset } from '@/shared/components/shadcn/sidebar';
import ApricitySidebar from '@/widgets/sidebar/ui/ProjectSidebar';
import ApricityAppHeader from '@/widgets/header/ui/ApricityHeader';
import { ActiveStoryProvider } from './contexts/active-story.context';
import StoryOnboardingGate from '@/features/story-onboarding/ui/OnboardingGate';

export default function ApricityAppShell() {

  
  return (
    <SidebarProvider>
      <ActiveStoryProvider>
        <StoryOnboardingGate>
          <ApricitySidebar />
          <SidebarInset>
            <ApricityAppHeader />
            <Outlet />
          </SidebarInset>
        </StoryOnboardingGate>
      </ActiveStoryProvider>
    </SidebarProvider>
  );
}
