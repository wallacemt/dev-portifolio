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
  useSidebar,
} from "@/components/ui/sidebar";
import { Code, List, Plus, School, SmartphoneCharging } from "lucide-react";
import { IconCircleDashedLetterV, IconDashboard } from "@tabler/icons-react";
import Link from "next/link";
import { Separator } from "./separator";
import { usePathname } from "next/navigation";
import { DetailsCard } from "../Visitor/Projects/_components/details-card";
import Image from "next/image";

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
          url: "/owner/projects?state=create",
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
          url: "/owner/skills?state=all",
          icon: List,
        },
        {
          title: "Adicionar novo",
          url: "/owner/skills?state=create",
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
          url: "/owner/education?state=all",
          icon: List,
        },
        {
          title: "Adicionar novo",
          url: "/owner/education?state=create",
          icon: Plus,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  const { state } = useSidebar();
  if (pathName.endsWith("auth")) return null;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5  flex items-center justify-center"
            >
              <Link href="/owner" role="img" aria-label="Logo">
                <h1
                  className={`font-principal xl:text-4xl md:text-2xl text-[1.8rem] ${
                    state === "collapsed" ? "hidden" : "block"
                  }`}
                >
                  Wallace<span className="text-Destaque">.Dev</span>
                </h1>
                <Image
                  src="https://res.cloudinary.com/dg9hqvlas/image/upload/v1751925493/Black_Creative_W_Letter_Logo-removebg-preview_yka3ae.png"
                  alt="Logo"
                  width={80}
                  height={80}
                  className={`${state === "collapsed" ? "block" : "hidden"} object-cover hover:scale-110`}
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent className="relative z-1">
        <NavMain items={data.navMain} />
        <DetailsCard max={1} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
