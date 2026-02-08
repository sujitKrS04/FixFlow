"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Info, AlertTriangle } from "lucide-react";

interface Annotation {
  line: number;
  message: string;
  severity: "error" | "warning" | "info";
}

interface ErrorAnnotationProps {
  code: string;
  language: string;
  annotations: Annotation[];
}

const severityConfig = {
  error: {
    icon: AlertCircle,
    color: "text-error",
    bg: "bg-error/10",
    border: "border-error/30",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
  },
  info: {
    icon: Info,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
  },
};

export function ErrorAnnotation({
  code,
  language,
  annotations,
}: ErrorAnnotationProps) {
  const lines = code.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-primary/30 rounded-lg overflow-hidden bg-surface/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 border-b border-primary/20">
        <span className="text-xs font-mono font-semibold">Code Analysis</span>
        <span className="text-xs opacity-60">• {language}</span>
      </div>

      <div className="relative">
        {/* Code with line numbers */}
        <div className="flex">
          {/* Line numbers */}
          <div className="flex-shrink-0 bg-background/50 px-3 py-4 text-right select-none border-r border-primary/20">
            {lines.map((_, index) => (
              <div
                key={index}
                className="text-xs font-mono opacity-50 leading-6"
              >
                {index + 1}
              </div>
            ))}
          </div>

          {/* Code content */}
          <div className="flex-1 py-4 px-4">
            {lines.map((line, index) => {
              const annotation = annotations.find((a) => a.line === index + 1);
              const config = annotation
                ? severityConfig[annotation.severity]
                : null;

              return (
                <div key={index} className="relative">
                  <motion.pre
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`text-xs font-mono leading-6 whitespace-pre ${
                      annotation ? config!.bg : ""
                    } ${annotation ? "font-semibold" : ""}`}
                  >
                    {line}
                  </motion.pre>

                  {/* Annotation */}
                  {annotation && config && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className={`mt-1 mb-2 p-3 rounded-lg border ${config.border} ${config.bg} flex items-start gap-2`}
                    >
                      {React.createElement(config.icon, {
                        size: 16,
                        className: `${config.color} mt-0.5 flex-shrink-0`,
                      })}
                      <div>
                        <div className="text-xs font-semibold mb-0.5">
                          {annotation.severity.toUpperCase()}
                        </div>
                        <div className="text-xs opacity-90">
                          {annotation.message}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
