"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginOwner } from "@/services/authApi";
import { useOwner } from "@/contexts/OwnerContext";
import { Loader2, Mail, Lock, User, LogIn } from "lucide-react";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").max(50, "Senha muito longa"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { login } = useOwner();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const result = await loginOwner(data.email, data.password);
      login(result.token, result.owner);
      return;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setLoginError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 h-full"
    >
      <Card className="overflow-hidden h-full p-0 bg-card/50 backdrop-blur-sm border-roxo300/20">
        <CardContent className="grid p-0 md:grid-cols-2 h-full">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 md:p-8 flex flex-col justify-center"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center text-center space-y-2"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-3 rounded-full bg-gradient-to-r from-roxo300 to-roxo100 mb-2"
                >
                  <User className="w-6 h-6 text-white" />
                </motion.div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-roxo300 to-roxo100 bg-clip-text text-transparent">
                  Bem-vindo de volta
                </h1>
                <p className="text-muted-foreground">Faça login em sua conta</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid gap-3"
              >
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className={`pl-10 transition-all duration-200 ${
                      errors.email
                        ? "border-red-400 focus:ring-red-400/20"
                        : "border-roxo300/30 focus:border-roxo300 focus:ring-roxo300/20"
                    }`}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-400"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid gap-3"
              >
                <Label htmlFor="password" className="text-sm font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className={`pl-10 transition-all duration-200 ${
                      errors.password
                        ? "border-red-400 focus:ring-red-400/20"
                        : "border-roxo300/30 focus:border-roxo300 focus:ring-roxo300/20"
                    }`}
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-400"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </motion.div>

              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-400/20"
                >
                  <p className="text-sm text-red-400 text-center">{loginError}</p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <Button
                  type="submit"
                  disabled={isLoading || !isValid}
                  className="w-full bg-gradient-to-r from-roxo300 to-roxo100 hover:from-roxo500 hover:to-roxo300 text-white font-medium transition-all duration-200 transform hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Entrar
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                animate={{
                  background: [
                    "linear-gradient(45deg, var(--textura-roxo-1-hex), var(--textura-roxo-2-hex))",
                    "linear-gradient(45deg, var(--textura-roxo-2-hex), var(--textura-roxo-3-hex))",
                    "linear-gradient(45deg, var(--textura-roxo-1-hex), var(--textura-roxo-2-hex))",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="h-1 rounded-full w-16 mx-auto opacity-50"
              />
            </form>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-muted relative hidden md:block overflow-hidden"
          >
            <Image
              src="https://res.cloudinary.com/dg9hqvlas/image/upload/v1754427252/Wallpaper_roxo_wr14nv.jpg"
              alt="Login Background"
              height={500}
              width={500}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-roxo500/40 via-roxo300/30 to-roxo100/40" />

            {/* Animated geometric shapes */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-white/20"
                  style={{
                    width: `${80 + i * 40}px`,
                    height: `${80 + i * 40}px`,
                    top: `${20 + i * 15}%`,
                    right: `${10 + i * 5}%`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
