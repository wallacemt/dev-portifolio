"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

const formatter = new Intl.NumberFormat("pt-BR");

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(value);
  const springValue = useSpring(motionValue, { damping: 20, stiffness: 100 });
  const display = useTransform(springValue, (current) => formatter.format(Math.round(current)));

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  if (shouldReduceMotion) {
    return <span className={className}>{formatter.format(value)}</span>;
  }

  return <motion.span className={className}>{display}</motion.span>;
}
