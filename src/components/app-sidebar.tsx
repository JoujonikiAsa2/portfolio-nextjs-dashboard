"use client";

import * as React from "react";
import { FileCode, FileText, Home, Layers, MessageSquare, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const adminBar = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Skills",
    url: "/dashboard/skills",
    icon: Layers,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: FileCode,
  },
  {
    title: "Blogs",
    url: "/dashboard/blogs",
    icon: FileText,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: MessageSquare,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = useSelector((state: RootState) => {
    return state.auth?.user;
  });
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={adminBar} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: (data?.name as string) || "--",
            email: (data?.email as string) || "--",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
