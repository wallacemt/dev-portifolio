"use client";

import { IconCreditCard, IconDotsVertical, IconLogout, IconNotification, IconUserCircle } from "@tabler/icons-react";
import { Suspense, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useOwner } from "@/contexts/OwnerContext";
import { OwnerResponse } from "@/types/owner";

function NavUserSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" disabled>
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32 mt-1" />
          </div>
          <Skeleton className="ml-auto h-4 w-4" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function NavUserError({ onRetry }: { onRetry: () => void }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" onClick={onRetry}>
          <Avatar className="h-8 w-8 rounded-full grayscale">
            <AvatarFallback className="rounded-lg bg-red-100 text-red-600">!</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium text-red-600">Erro ao carregar</span>
            <span className="text-muted-foreground truncate text-xs">Clique para tentar novamente</span>
          </div>
          <IconDotsVertical className="ml-auto size-4 text-red-600" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function NavUserContent() {
  const { isMobile } = useSidebar();

  const { handleOwner, owner, logout, isLoading: contextLoading, error: contextError, clearError } = useOwner();
  const [isLoading, setIsLoading] = useState(contextLoading);
  const [error, setError] = useState<string | null>(contextError);
  const [ownerData, setOwnerData] = useState<OwnerResponse | null>(null);

  useEffect(() => {
    setIsLoading(contextLoading);
    setError(contextError);
  }, [contextLoading, contextError]);
  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        setIsLoading(true);
        const data = await handleOwner();
        setOwnerData(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido");
        }
      } finally {
        setIsLoading(false);
      }
    };
    const fetchData = async () => {
      if (owner && owner.id) {
        setOwnerData(owner);
        setIsLoading(false);
        setError(null);
      } else {
        await fetchOwnerData();
      }
    };

    fetchData();
  }, [owner] 
);

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setError("Erro ao fazer logout");
    }
  };

  const handleRetry = () => {
    clearError();
    setError(null);
  };

  if (isLoading) {
    return <NavUserSkeleton />;
  }

  if (error) {
    return <NavUserError onRetry={handleRetry} />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full grayscale">
                <AvatarImage src={"/owner.jpeg"} alt={ownerData?.name || "Owner"} />
                <AvatarFallback className="rounded-lg">
                  {ownerData?.name ? ownerData.name.slice(0, 2).toUpperCase() : "WS"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{ownerData?.name || "Owner"}</span>
                <span className="text-muted-foreground truncate text-xs">{ownerData?.email || ""}</span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-12 w-12 rounded-full">
                  <AvatarImage src={"/owner.jpeg"} alt={ownerData?.name || "Owner"} />
                  <AvatarFallback className="rounded-lg">
                    {ownerData?.name ? ownerData.name.slice(0, 2).toUpperCase() : "WS"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{ownerData?.name || "Owner"}</span>
                  <span className="text-muted-foreground truncate text-xs">{ownerData?.email || ""}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function NavUser() {
  return (
    <Suspense fallback={<NavUserSkeleton />}>
      <NavUserContent />
    </Suspense>
  );
}
