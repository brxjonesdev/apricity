import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/shared/components/shadcn/sidebar';
import StorySelect from '@/widgets/story-select-menu/ui/StorySelect';
import ManuscriptOutline from '../../outline/ui/ManuscriptOutline';
import { useActiveStory } from '@/app/layouts/contexts/active-story.context';
export default function ApricitySidebar() {
  const {activeStoryId} = useActiveStory()
  return (
    <Sidebar>
      <SidebarHeader className='max-h-16 h-full border-b text-center flex items-center justify-center'>
        <p className='text-xl'>Apricity</p>
      </SidebarHeader>
      <SidebarContent className=''>
        <ManuscriptOutline storyId={activeStoryId} />
      </SidebarContent>
    </Sidebar>
  );
}
