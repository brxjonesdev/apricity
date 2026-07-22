import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/shared/components/shadcn/sidebar';
import ProjectSelect from '@/features/switch-project/ui/ProjectSelect';
import ManuscriptOutline from '../../manuscript-outline/ui/ManuscriptOutline';
export default function ProjectSidebar() {
  return (
    <Sidebar>
      <section className='max-h-16 h-full border-b text-center flex items-center justify-center'>
        <p className='text-xl'>Apricity</p>
      </section>
      <ProjectSelect/>
      <SidebarContent>
        <ManuscriptOutline/>
      </SidebarContent>
    </Sidebar>
  );
}
