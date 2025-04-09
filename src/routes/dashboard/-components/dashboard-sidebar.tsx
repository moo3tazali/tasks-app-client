import { Link } from '@tanstack/react-router';

import {
  Logo,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';
import { NavUser } from './nav-user';
import { useNavItems } from '../-hooks/use-nav-items';

export function DashboardSidebar() {
  const user = useAuth((s) => s.user);

  const { items } = useNavItems();

  return (
    <Sidebar variant='sidebar' collapsible='icon'>
      <SidebarHeader className='h-16 md:h-20 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 group-has-[[data-collapsible=icon]]/sidebar-wrapper:md:h-16 flex justify-center items-center'>
        <Logo className='group-data-[state=collapsed]:text-xs transition-all ease-linear' />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='gap-2'>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                  >
                    <Link to={item.url}>
                      <item.icon />

                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
