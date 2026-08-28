"use client";
import { OwnerResponse } from "@/types/owner";
import { cookieUtils } from "@/lib/cookies";
import { createContext, useCallback, useContext, useState, useEffect, useMemo } from "react";
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

  const login = useCallback((token: string, ownerData: OwnerResponse) => {
    cookieUtils.setAuthToken(token);
    setOwner(ownerData);
  }, []);

  const logout = useCallback(() => {
    cookieUtils.removeAuthToken();
    router.push("/owner/auth");
    setIsVerifySecret(false);
  }, [router]);

  const handleOwner = useCallback(async (): Promise<OwnerResponse> => {
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
  }, [logout]);

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
  }, [handleOwner]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleVerifySecret = useCallback(() => setIsVerifySecret((prev) => !prev), []);

  const value = useMemo(
    () => ({
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
    }),
    [owner, login, logout, isLoading, error, isVerifySecret, handleOwner, handleVerifySecret, clearError, isAuthenticated]
  );

  return <OwnerContext.Provider value={value}>{children}</OwnerContext.Provider>;
};

export const useOwner = () => useContext(OwnerContext);
