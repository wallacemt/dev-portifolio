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
import { Code, HandPlatter, List, Plus, School, SmartphoneCharging } from "lucide-react";
import { IconCircleDashedLetterV, IconDashboard } from "@tabler/icons-react";
import Link from "next/link";
import { Separator } from "./separator";
import { usePathname } from "next/navigation";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/owner/dashboard",
      icon: IconDashboard,
      items: [
        {
          title: "Análise detalhada",
          url: "/owner/dashboard/analyze",
          icon: IconCircleDashedLetterV,
        },
      ],
    },
    {
      title: "Projetos",
      url: "/owner/projects",
      icon: Code,
      items: [
        {
          title: "Ver todos",
          url: "/owner/projects?state=all",
          icon: List,
        },
        {
          title: "Adicionar novo",
          url: "/owner/projects/add",
          icon: Plus,
        },
      ],
    },
    {
      title: "Habilidades",
      url: "/owner/skills",
      icon: SmartphoneCharging,
      items: [
        {
          title: "Ver todos",
          url: "/owner/skills/all",
          icon: List,
        },
        {
          title: "Adicionar novo",
          url: "/owner/skills/add",
          icon: Plus,
        },
      ],
    },
    {
      title: "Formações",
      url: "/owner/education",
      icon: School,
      items: [
        {
          title: "Ver todos",
          url: "/owner/education/all",
          icon: List,
        },
        {
          title: "Adicionar novo",
          url: "/owner/education/add",
          icon: Plus,
        },
      ],
    },
    {
      title: "Serviços",
      url: "/owner/services",

      icon: HandPlatter,
      items: [
        {
          title: "Ver todos",
          url: "/owner/services/all",
          icon: List,
        },
        {
          title: "Adicionar novo",
          url: "/owner/services/add",
          icon: Plus,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  if (pathName.endsWith("auth")) return null;
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
