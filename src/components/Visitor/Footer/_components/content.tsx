"use client";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  MailboxIcon,
  DiscordLogoIcon,
  DevicesIcon,
  RobotIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import GitHubCalendar from "react-github-calendar";
import { Separator } from "@/components/ui/separator";
import { NavbarItens } from "@/types/utilis";

interface FooterProps {
  menuItens: NavbarItens;
}
export const FooterContent = ({ menuItens }: FooterProps) => {
  const social = [
    {
      href: "mailto:wallacesantanak0@gmail.com",
      icon: MailboxIcon,
      label: "Email",
      title: "wallacesantanak0@gmail.com",
    },
    {
      href: "https://github.com/wallacemt",
      icon: GithubLogoIcon,
      label: "GitHub",
      title: "wallacemt",
    },
    {
      href: "https://www.linkedin.com/in/wallace-santanak0",
      icon: LinkedinLogoIcon,
      label: "LinkedIn",
      title: "wallace-santanak0",
    },
    {
      href: "https://discord.com/users/715397662479745044",
      icon: DiscordLogoIcon,
      label: "Discord",
      title: "wallacemt",
    },
    {
      href: "/owner",
      icon: RobotIcon,
      label: "Owner",
      title: "wallacemt",
    },
  ];
  const currentYear = new Date().getFullYear();
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-6 flex flex-col gap-2">
      <div className="flex md:flex-row flex-col justify-between gap-8 md:items-start">
        <GitHubCalendar
          username="wallacemt"
          style={{ userSelect: "none" }}
          blockSize={15}
          blockMargin={2}
          fontSize={11}
          hideColorLegend={false}
          errorMessage="Erro ao carregar dados"
          throwOnError={false}
          labels={{
            legend: {
              less: "-",
              more: "+",
            },
          }}
        />
        <div className="flex flex-col gap-4 items-center jubustify-center">
          <div className="flex flex-wrap gap-3">
            {social.map(({ href, icon: Icon, label, title }, idx) =>
              label != "Owner" ? (
                <Link
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card hover:bg-purple-primary/10 border border-border hover:border-purple-primary/30 transition-all group"
                  aria-label={label}
                  title={title}
                >
                  <Icon size={22} className="text-muted-foreground group-hover:text-purple-primary" />
                </Link>
              ) : (
                <Link
                  key={idx}
                  href={href}
             
                  className="p-2 rounded-lg bg-card hover:bg-purple-primary/10 border border-border hover:border-purple-primary/30 transition-all group opacity-0 hover:opacity-100"
                  aria-label={label}
                  title={title}
                >
                  <Icon size={22} className="text-muted-foreground group-hover:text-purple-primary" />
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-2 text-sm mt-6 text-muted-foreground">
            <MapPinIcon size={16} className="text-purple-primary" />
            <span>Salvador, BA - Brasil</span>
          </div>
        </div>
      </div>

      <Separator />
      <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>
            © {currentYear}{" "}
            <span className="font-principal">
              Wallace <span className="text-Destaque">Santana</span>
            </span>
          </span>
          <DevicesIcon size={16} className="text-roxo100 animate-pulse" />
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-card border border-border rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs">{menuItens.callText}</span>
        </div>
      </div>
    </div>
  );
};
