"use client";
import { OwnerResponse } from "@/types/owner";
import { createContext, useContext, useState } from "react";

interface OwnerContext {
  owner: OwnerResponse;
  setOwner: (owner: OwnerResponse) => void;
}

const OwnerContext = createContext<OwnerContext>({
  owner: {} as OwnerResponse,
  setOwner: () => {},
});

export const OwnerProvider = ({ children }: { children: React.ReactNode }) => {
  const [owner, setOwner] = useState<OwnerResponse>({} as OwnerResponse);

  return <OwnerContext.Provider value={{ owner, setOwner }}>{children}</OwnerContext.Provider>;
};

export const useOwner = () => useContext(OwnerContext);
