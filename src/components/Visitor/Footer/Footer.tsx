"use client";

import { NavbarItens } from "@/types/utilis";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  HeartIcon,
  MapPinIcon,
  MailboxIcon,
  DiscordLogoIcon,
  DevToLogoIcon,
  DevicesIcon,
} from "@phosphor-icons/react";
import Link from "next/link";

interface FooterProps {
  items: NavbarItens;
}
export default function Footer({ items }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/60 max-w-full  relative bottom-0 backdrop-blur-sm border-t border-border mt-12 self-end">
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-2">
              <div>
                <h3 className="text-lg font-bold text-foreground pixel-font"></h3>
                <p className="text-sm text-muted-foreground"></p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm mb-4 text-muted-foreground">
              <MapPinIcon size={16} className="text-purple-primary" />
              <span>Salvador, BA - Brasil</span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-foreground font-semibold mb-4 pixel-font">Navegação</h4>
            <ul className="space-y-2">
              {items.itens.map((item, key) => (
                <li key={key + item.path}>
                  <Link
                    href={item.path}
                    className="text-muted-foreground hover:text-purple-primary transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="mailto:wallacesantanak0@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card hover:bg-purple-primary/10 border border-border hover:border-purple-primary/30 transition-all duration-300 group"
                  aria-label="Email"
                  title="wallacesantanak0@gmail.com"
                >
                  <MailboxIcon
                    size={22}
                    className="text-muted-foreground group-hover:text-purple-primary transition-colors"
                  />
                </a>
                <a
                  href="https://github.com/wallacemt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card hover:bg-purple-primary/10 border border-border hover:border-purple-primary/30 transition-all duration-300 group"
                  aria-label="GitHub"
                  title="wallacemt"
                >
                  <GithubLogoIcon
                    size={22}
                    className="text-muted-foreground group-hover:text-purple-primary transition-colors"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/wallace-santanak0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card hover:bg-purple-primary/10 border border-border hover:border-purple-primary/30 transition-all duration-300 group"
                  aria-label="LinkedIn"
                  title="wallace-santanak0"
                >
                  <LinkedinLogoIcon
                    size={22}
                    className="text-muted-foreground group-hover:text-purple-primary transition-colors"
                  />
                </a>
                <a
                  href="https://discord.com/users/715397662479745044"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card hover:bg-purple-primary/10 border border-border hover:border-purple-primary/30 transition-all duration-300 group"
                  aria-label="LinkedIn"
                  title="wallacemt"
                >
                  <DiscordLogoIcon
                    size={22}
                    className="text-muted-foreground group-hover:text-purple-primary transition-colors"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-secundaria">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {currentYear} <span className="font-principal">Wallace <span className="text-Destaque">Santana</span></span></span>
              <DevicesIcon size={16} className="text-roxo100 animate-pulse" />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-card border border-border rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">{items.callText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
