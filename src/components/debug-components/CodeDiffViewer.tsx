"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { vs } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Check, X, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface CodeDiffViewerProps {
  original: string;
  fixed: string;
  language: string;
  fileName: string;
  explanation?: string;
}

export function CodeDiffViewer({
  original,
  fixed,
  language,
  fileName,
  explanation,
}: CodeDiffViewerProps) {
  const [view, setView] = useState<"split" | "unified">("split");
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`border rounded-lg p-4 backdrop-blur-sm ${
        theme === "light"
          ? "border-gray-300 bg-white shadow-md"
          : "border-primary/30 bg-surface/50"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ChevronRight className={theme === "light" ? "text-blue-600" : "text-primary"} size={20} />
          <h3 className={`text-lg font-semibold font-mono ${
            theme === "light" ? "text-gray-900" : ""
          }`}>{fileName}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("split")}
            className={`px-3 py-1 text-xs rounded transition-all ${
              view === "split"
                ? theme === "light"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-primary text-background"
                : theme === "light"
                  ? "bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200"
                  : "bg-surface border border-primary/30"
            }`}
          >
            Split
          </button>
          <button
            onClick={() => setView("unified")}
            className={`px-3 py-1 text-xs rounded transition-all ${
              view === "unified"
                ? theme === "light"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-primary text-background"
                : theme === "light"
                  ? "bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200"
                  : "bg-surface border border-primary/30"
            }`}
          >
            Unified
          </button>
        </div>
      </div>

      {explanation && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-sm mb-4 p-3 rounded border-l-4 ${
            theme === "light"
              ? "bg-blue-50 border-blue-500 text-gray-800"
              : "opacity-70 bg-accent/10 border-accent"
          }`}
        >
          {explanation}
        </motion.p>
      )}

      {view === "split" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Before Section */}
          <div className={`border rounded-lg overflow-hidden ${
            theme === "light" 
              ? "border-red-300 bg-red-50/50" 
              : "border-error/30"
          }`}>
            <div className={`flex items-center gap-2 px-3 py-2 text-xs font-mono border-b ${
              theme === "light"
                ? "bg-red-100 border-red-200 text-red-900"
                : "bg-error/20 text-error"
            }`}>
              <X size={14} className={theme === "light" ? "text-red-700" : "text-error"} />
              <span className="font-semibold">❌ Before</span>
            </div>
            <div className={`overflow-x-auto ${
              theme === "light" ? "bg-white" : ""
            }`}>
              <SyntaxHighlighter
                language={language}
                style={theme === "light" ? vs : vscDarkPlus}
                customStyle={{
                  margin: 0,
                  background: theme === "light" ? "#ffffff" : "transparent",
                  fontSize: "0.875rem",
                  padding: "1rem",
                  borderLeft: theme === "light" ? "4px solid #dc2626" : "4px solid transparent",
                }}
                codeTagProps={{
                  style: {
                    color: theme === "light" ? "#1e293b" : undefined,
                    fontWeight: theme === "light" ? "500" : undefined,
                  }
                }}
              >
                {original}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* After Section */}
          <div className={`border rounded-lg overflow-hidden ${
            theme === "light" 
              ? "border-green-300 bg-green-50/50" 
              : "border-success/30"
          }`}>
            <div className={`flex items-center gap-2 px-3 py-2 text-xs font-mono border-b ${
              theme === "light"
                ? "bg-green-100 border-green-200 text-green-900"
                : "bg-success/20 text-success"
            }`}>
              <Check size={14} className={theme === "light" ? "text-green-700" : "text-success"} />
              <span className="font-semibold">✅ After</span>
            </div>
            <div className={`overflow-x-auto ${
              theme === "light" ? "bg-white" : ""
            }`}>
              <SyntaxHighlighter
                language={language}
                style={theme === "light" ? vs : vscDarkPlus}
                customStyle={{
                  margin: 0,
                  background: theme === "light" ? "#ffffff" : "transparent",
                  fontSize: "0.875rem",
                  padding: "1rem",
                  borderLeft: theme === "light" ? "4px solid #059669" : "4px solid transparent",
                }}
                codeTagProps={{
                  style: {
                    color: theme === "light" ? "#1e293b" : undefined,
                    fontWeight: theme === "light" ? "500" : undefined,
                  }
                }}
              >
                {fixed}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      ) : (
        <div className={`border rounded-lg overflow-hidden ${
          theme === "light" ? "border-gray-300" : "border-primary/30"
        }`}>
          <div className={`flex items-center gap-2 px-3 py-2 text-xs font-mono border-b ${
            theme === "light"
              ? "bg-gray-100 border-gray-200 text-gray-900"
              : "bg-primary/10"
          }`}>
            <span className="font-semibold">Unified Diff</span>
          </div>
          <div className={`overflow-x-auto ${
            theme === "light" ? "bg-white" : "bg-surface"
          }`}>
            <div className={`font-mono text-xs p-4 space-y-1 ${
              theme === "light" ? "text-gray-900" : ""
            }`}>
              <div className={`p-2 rounded ${
                theme === "light" 
                  ? "bg-red-50 text-red-900 border-l-4 border-red-600 font-semibold" 
                  : "text-error"
              }`}>
                - {original}
              </div>
              <div className={`p-2 rounded ${
                theme === "light" 
                  ? "bg-green-50 text-green-900 border-l-4 border-green-600 font-semibold" 
                  : "text-success"
              }`}>
                + {fixed}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
