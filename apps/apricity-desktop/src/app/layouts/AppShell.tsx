import { Outlet } from 'react-router';
import { SidebarProvider } from '@/shared/components/shadcn/sidebar';
import ProjectSidebar from '@/widgets/project-sidebar/ui/ProjectSidebar';
import AppHeader from '@/widgets/project-header/ui/ApricityHeader';

export default function ApricityAppShell() {
  // get ProjectSidebar
  return (<>
    <SidebarProvider>
          <div className="flex h-screen flex-col w-full">
            <AppHeader />
    
            <div className="flex flex-1 overflow-hidden">
              <ProjectSidebar />
    
              <main className="flex-1 overflow-auto">
                <Outlet />
              </main>
            </div>
          </div>
        </SidebarProvider>
  </> );
}