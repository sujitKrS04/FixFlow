"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-surface/80 backdrop-blur-md shadow-inner">
      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-6 max-w-[1280px]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Made with love */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm opacity-70">
            <span className="hidden sm:inline">Made with</span>
            <span className="sm:hidden">Made with</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <Heart size={14} className="text-error fill-error sm:w-4 sm:h-4" />
            </motion.div>
            <span className="hidden sm:inline">by developers, for developers</span>
            <span className="sm:hidden">for developers</span>
          </div>

          {/* Powered by */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <span className="opacity-70">Powered by</span>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://tambo.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-semibold text-primary hover:text-secondary transition-colors"
            >
              <Sparkles size={14} className="sm:w-3.5 sm:h-3.5" />
              Tambo AI
            </motion.a>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 sm:mt-4 text-xs opacity-60">
          <a href="#" className="hover:opacity-100 hover:text-primary transition-all">
            Documentation
          </a>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:opacity-100 hover:text-primary transition-all">
            GitHub
          </a>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:opacity-100 hover:text-primary transition-all">
            Report Issue
          </a>
        </div>
      </div>
    </footer>
  );
}
