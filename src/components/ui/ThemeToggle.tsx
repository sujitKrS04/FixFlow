"use client";

import React from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-surface border-2 border-primary/30 p-1 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        animate={{
          x: theme === "dark" ? 0 : 24,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {theme === "dark" ? (
          <Moon size={14} className="text-background" />
        ) : (
          <Sun size={14} className="text-background" />
        )}
      </motion.div>
    </motion.button>
  );
}
