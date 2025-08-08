import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface SiteProps {
  title: string;
  icon?: React.ReactNode;
}

export function SiteHeader({ title, icon }: SiteProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center  transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)  relative mt-3">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-2 text-sidebar-foreground" />
        <Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />
        <p className="flex items-center font-semibold gap-2 text-xl text-popover-foreground">
          {icon && <span>{icon}</span>}
          <span className={`font-principal`}>{title}</span>
        </p>
      </div>
    </header>
  );
}
