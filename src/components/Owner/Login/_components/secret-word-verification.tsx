"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Lock, Shield } from "lucide-react";
import { verifySecretWord } from "@/services/ownerApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useOwner } from "@/contexts/OwnerContext";
import Link from "next/link";

export function SecretWordVerification() {
  const [secretWord, setSecretWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ownerContext = useOwner();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretWord.trim()) return;
    setIsLoading(true);
    try {
      const result = await verifySecretWord(secretWord);
      if (result.isValid) {
        onVerified(result.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  function onVerified(message: string) {
    ownerContext.handleVerifySecret();
    router.push("/owner/auth?step=login");
    return toast.success(message || "Verificado com sucesso!");
  }
  useEffect(() => {
    router.replace("/owner/auth?step=verify");
  }, [router]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen p-6"
    >
      <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-roxo300/20">
        <CardContent className="p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(214, 41, 217, 0.3)",
                    "0 0 40px rgba(214, 41, 217, 0.6)",
                    "0 0 20px rgba(214, 41, 217, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-4 rounded-full bg-gradient-to-r from-roxo300 to-roxo100"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-foreground font-principal">Área Restrita</h1>
              <p className="text-muted-foreground font-secundaria">Digite a palavra secreta para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="secret" className="text-sm font-medium">
                  Palavra Secreta
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="secret"
                    type="password"
                    value={secretWord}
                    onChange={(e) => setSecretWord(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 border-roxo300/30 focus:border-roxo300 focus:ring-roxo300/20"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !secretWord.trim()}
                className="w-full bg-gradient-to-r from-roxo300 to-roxo100 hover:from-roxo500 hover:to-roxo300 text-white font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Verificar
                  </>
                )}
              </Button>
              <Link href={"/"}>
                <Button className="w-full bg-gradient-to-r from-roxo300 to-roxo100 hover:from-roxo500 hover:to-roxo300 text-white font-medium cursor-pointer">
                  Voltar
                </Button>
              </Link>
            </form>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
