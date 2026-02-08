"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ChevronDown, ChevronRight, Target } from "lucide-react";

interface StackFrame {
  file: string;
  line: number;
  column?: number;
  functionName: string;
  code: string;
  isErrorOrigin?: boolean;
}

interface StackTraceViewerProps {
  frames: StackFrame[];
  errorMessage: string;
  errorType: string;
}

export function StackTraceViewer({
  frames,
  errorMessage,
  errorType,
}: StackTraceViewerProps) {
  const [expandedFrames, setExpandedFrames] = useState<Set<number>>(
    new Set([0])
  );

  const toggleFrame = (index: number) => {
    const newExpanded = new Set(expandedFrames);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedFrames(newExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-error/30 rounded-lg p-4 bg-surface/50 backdrop-blur-sm"
    >
      {/* Error Header */}
      <div className="flex items-start gap-3 mb-4 p-4 bg-error/10 rounded-lg border-l-4 border-error">
        <AlertCircle className="text-error mt-1 flex-shrink-0" size={24} />
        <div className="flex-1">
          <h3 className="text-lg font-semibold font-mono text-error mb-1">
            {errorType}
          </h3>
          <p className="text-sm opacity-90">{errorMessage}</p>
        </div>
      </div>

      {/* Stack Frames */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold opacity-70 mb-3 flex items-center gap-2">
          <Target size={16} />
          STACK TRACE
        </h4>
        {frames.map((frame, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`border rounded-lg overflow-hidden ${
              frame.isErrorOrigin
                ? "border-error/50 bg-error/5"
                : "border-primary/20 bg-surface/30"
            }`}
          >
            {/* Frame Header */}
            <button
              onClick={() => toggleFrame(index)}
              className="w-full flex items-center gap-3 p-3 hover:bg-primary/5 transition-colors"
            >
              {expandedFrames.has(index) ? (
                <ChevronDown size={16} className="text-primary flex-shrink-0" />
              ) : (
                <ChevronRight size={16} className="text-primary flex-shrink-0" />
              )}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  {frame.isErrorOrigin && (
                    <span className="px-2 py-0.5 bg-error text-white text-xs rounded font-mono">
                      ERROR ORIGIN
                    </span>
                  )}
                  <span className="font-mono text-sm font-semibold">
                    {frame.functionName}
                  </span>
                </div>
                <div className="text-xs opacity-70 font-mono">
                  {frame.file}:{frame.line}
                  {frame.column && `:${frame.column}`}
                </div>
              </div>
            </button>

            {/* Frame Code */}
            <AnimatePresence>
              {expandedFrames.has(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-primary/20"
                >
                  <pre className="p-4 text-xs font-mono bg-background/50 overflow-x-auto">
                    <code>{frame.code}</code>
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
