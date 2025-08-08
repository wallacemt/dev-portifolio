"use client";

import * as React from "react";
import { NavMain } from "@/components/ui/nav-main";
import { NavUser } from "@/components/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Code, HandPlatter, School, SmartphoneCharging } from "lucide-react";
import { IconDashboard } from "@tabler/icons-react";
import Link from "next/link";
import { Separator } from "./separator";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/owner/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Projetos",
      url: "/owner/projects",
      icon: Code,
    },
    {
      title: "Habilidades",
      url: "/owner/skills",
      icon: SmartphoneCharging,
    },
    {
      title: "Formações",
      url: "/owner/education",
      icon: School,
    },
    {
      title: "Serviços",
      url: "/owner/services",
      icon: HandPlatter,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5  flex items-center justify-center"
            >
              <Link href="/owner" role="img" aria-label="Logo">
                <h1 className="font-principal xl:text-3xl md:text-2xl text-[1.8rem]">
                  Wallace<span className="text-Destaque">.Dev</span>
                </h1>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
