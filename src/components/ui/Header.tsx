"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Github, /* Info */ } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-b border-primary/20 bg-surface/80 backdrop-blur-md sticky top-0 z-50 shadow-lg"
    >
      <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between max-w-[1280px]">
        {/* Logo and Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-md"
          >
            <Sparkles className="text-background w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
          <div>
            <h1 className="text-base sm:text-xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Debugging Copilot
            </h1>
            <p className="text-[10px] sm:text-xs opacity-70">Powered by Tambo</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:p-2 rounded-lg border border-primary/30 bg-surface hover:bg-primary/10 transition-all hover:border-primary/50 hover:shadow-md"
            aria-label="GitHub"
          >
            <Github size={18} className="sm:w-5 sm:h-5" />
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}
