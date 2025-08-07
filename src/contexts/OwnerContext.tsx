"use client";
import { OwnerResponse } from "@/types/owner";
import { cookieUtils } from "@/lib/cookies";
import { createContext, useContext, useState, useEffect } from "react";
import { getOwner } from "@/services/ownerApi";
import { useRouter } from "next/navigation";

interface OwnerContext {
  owner: OwnerResponse;
  setOwner: (owner: OwnerResponse) => void;

  login: (token: string, ownerData: OwnerResponse) => void;
  logout: () => void;
  isLoading: boolean;
  isVerifySecret: boolean;
  handleVerifySecret: () => void;
}

const OwnerContext = createContext<OwnerContext>({
  owner: {} as OwnerResponse,
  setOwner: () => {},

  login: () => {},
  logout: () => {},
  isLoading: true,
  isVerifySecret: true,
  handleVerifySecret: () => {},
});

export const OwnerProvider = ({ children }: { children: React.ReactNode }) => {
  const [owner, setOwner] = useState<OwnerResponse>({} as OwnerResponse);
  const [isVerifySecret, setIsVerifySecred] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const token = cookieUtils.getAuthToken();
    if (token) {
      handleOwner();
    }
    setIsLoading(false);
  }, [owner]);

  const login = (token: string, ownerData: OwnerResponse) => {
    cookieUtils.setAuthToken(token);
    setOwner(ownerData);
  };

  const logout = () => {
    cookieUtils.removeAuthToken();
    setOwner({} as OwnerResponse);
    router.push("/owner/auth");
  };

  const handleOwner = async () => {
    try {
      const owner = await getOwner();
      return setOwner(owner);
    } catch (err) {
      console.error("Error fetching owner data:", err);
      return logout();
    }
  };
  const handleVerifySecret = () => setIsVerifySecred(!isVerifySecret);
  return (
    <OwnerContext.Provider
      value={{
        owner,
        setOwner,

        login,
        logout,
        isLoading,
        isVerifySecret,
        handleVerifySecret,
      }}
    >
      {children}
    </OwnerContext.Provider>
  );
};

export const useOwner = () => useContext(OwnerContext);
