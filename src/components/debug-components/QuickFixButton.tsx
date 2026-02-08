"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Check, Download, Copy, Loader2, AlertTriangle } from "lucide-react";

interface QuickFixButtonProps {
  patchCode: string;
  fileName: string;
  description: string;
}

export function QuickFixButton({
  patchCode,
  fileName,
  description,
}: QuickFixButtonProps) {
  const [isApplying, setIsApplying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string>("");

  const handleApplyFix = async () => {
    setIsApplying(true);
    setError("");
    
    try {
      const response = await fetch('/api/apply-fix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName,
          content: patchCode,
          action: 'write',
          backupEnabled: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to apply fix');
      }

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to apply fix to file');
    } finally {
      setIsApplying(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(patchCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([patchCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.patch`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="border border-success/30 rounded-lg p-6 bg-surface/50 backdrop-blur-sm"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
          <Zap className="text-success" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Quick Fix Available</h3>
          <p className="text-sm opacity-80 mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleApplyFix}
              disabled={isApplying || isSuccess}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
                isSuccess
                  ? "bg-success text-white"
                  : "bg-primary hover:bg-primary/80 text-background"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isApplying ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Applying...
                </>
              ) : isSuccess ? (
                <>
                  <Check size={16} />
                  Fixed!
                </>
              ) : (
                <>
                  <Zap size={16} />
                  Apply Fix
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-lg border border-primary/30 bg-surface hover:bg-primary/10 text-sm flex items-center gap-2 transition-colors"
            >
              {isCopied ? (
                <>
                  <Check size={16} className="text-success" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy Code
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="px-4 py-2.5 rounded-lg border border-primary/30 bg-surface hover:bg-primary/10 text-sm flex items-center gap-2 transition-colors"
            >
              <Download size={16} />
              Download Patch
            </motion.button>
          </div>

          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-success/10 border border-success/30 rounded-lg text-sm"
            >
              ✨ Fix applied successfully! Your code should now work as expected.
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-error/10 border border-error/30 rounded-lg text-sm flex items-start gap-2"
            >
              <AlertTriangle size={16} className="text-error flex-shrink-0 mt-0.5" />
              <div>
                <strong>Failed to apply fix:</strong> {error}
                <div className="mt-2 text-xs opacity-80">
                  Try copying the code manually or downloading the patch file instead.
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
