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
  error: string | null;
  handleOwner: () => Promise<OwnerResponse>;
  isVerifySecret: boolean;
  handleVerifySecret: () => void;
  clearError: () => void;
  isAuthenticated?: boolean;
}

const OwnerContext = createContext<OwnerContext>({
  owner: {} as OwnerResponse,
  setOwner: () => {},
  login: () => {},
  logout: () => {},
  isLoading: true,
  error: null,
  isVerifySecret: true,
  handleOwner: async () => {
    return {} as OwnerResponse;
  },
  handleVerifySecret: () => {},
  clearError: () => {},
  isAuthenticated: false,
});

export const OwnerProvider = ({ children }: { children: React.ReactNode }) => {
  const [owner, setOwner] = useState<OwnerResponse>({} as OwnerResponse);
  const [isVerifySecret, setIsVerifySecret] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticate] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchInit = () => {
      const token = cookieUtils.getAuthToken();
      if (token) {
        setIsAuthenticate(true);
        handleOwner();
      }
      setIsLoading(false);
    };
    fetchInit();
  }, []);

  const login = (token: string, ownerData: OwnerResponse) => {
    cookieUtils.setAuthToken(token);
    setOwner(ownerData);
  };

  const logout = () => {
    cookieUtils.removeAuthToken();
    router.push("/owner/auth");
    setIsVerifySecret(false);
  };

  const handleOwner = async (): Promise<OwnerResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const owner = await getOwner();
      setOwner(owner);
      return owner;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error fetching owner data";
      setError(errorMessage);
      console.error("Error fetching owner data:", err);
      logout();
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const handleVerifySecret = () => setIsVerifySecret(!isVerifySecret);
  return (
    <OwnerContext.Provider
      value={{
        owner,
        setOwner,
        login,
        logout,
        isLoading,
        error,
        isVerifySecret,
        handleOwner,
        handleVerifySecret,
        clearError,
        isAuthenticated,
      }}
    >
      {children}
    </OwnerContext.Provider>
  );
};

export const useOwner = () => useContext(OwnerContext);
