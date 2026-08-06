import { cn } from "@/lib/utils";
import { StreamStatus } from "@/hooks/useAnalyticsStream";

interface LiveBadgeProps {
  status: StreamStatus;
  className?: string;
}

const STATUS_CONFIG: Record<StreamStatus, { label: string; dot: string }> = {
  live: { label: "Ao vivo", dot: "bg-emerald-500" },
  connecting: { label: "Reconectando", dot: "bg-amber-500" },
  offline: { label: "Offline", dot: "bg-gray-400" },
};

export function LiveBadge({ status, className }: LiveBadgeProps) {
  const { label, dot } = STATUS_CONFIG[status];

  return (
    <div className={cn("flex items-center gap-2 text-sm font-medium", className)}>
      <span className="relative flex size-2.5">
        {status === "live" && (
          <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", dot)} />
        )}
        <span className={cn("relative inline-flex size-2.5 rounded-full", dot)} />
      </span>
      {label}
    </div>
  );
}
