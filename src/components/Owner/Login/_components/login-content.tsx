"use client";
import { AnimatePresence } from "framer-motion";
import { useOwner } from "@/contexts/OwnerContext";
import { SecretWordVerification } from "./secret-word-verification";
import { LoginForm } from "./login-form";
export const LoginContent = ({ step }: { step?: "login" | "verify" }) => {
  const { isVerifySecret } = useOwner();
  return (
    <AnimatePresence mode="wait">
      {!isVerifySecret || step != "login" ? (
        <SecretWordVerification />
      ) : (
        <div key="login" className="flex items-center justify-center min-h-screen p-6">
          <div className="w-full max-w-4xl">
            <LoginForm />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
