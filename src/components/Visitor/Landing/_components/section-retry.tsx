"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SectionRetryProps {
  message: string;
  retryLabel: string;
}

// Server Components can't re-fetch on their own click — router.refresh()
// re-runs the current route's Server Components (including the failed
// fetch inside LandingExtras) without a full page reload.
export function SectionRetry({ message, retryLabel }: SectionRetryProps) {
  const router = useRouter();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    router.refresh();
    setTimeout(() => setIsRetrying(false), 1500);
  };

  return (
    <div className="text-center py-8">
      <p className="text-foreground/60 mb-4">{message}</p>
      <button
        onClick={handleRetry}
        disabled={isRetrying}
        className="px-4 py-2 bg-roxo600 text-white rounded hover:bg-roxo700 transition-colors disabled:opacity-50 cursor-pointer"
      >
        {isRetrying ? "..." : retryLabel}
      </button>
    </div>
  );
}
