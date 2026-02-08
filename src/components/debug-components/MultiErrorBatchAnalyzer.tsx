"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, AlertCircle, Zap, Trash2, Upload } from "lucide-react";

interface ErrorItem {
  id: string;
  error: string;
  severity: "low" | "medium" | "high";
}

interface MultiErrorBatchProps {
  onAnalyze: (errors: string[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function MultiErrorBatchAnalyzer({
  onAnalyze,
  isOpen,
  onClose,
}: MultiErrorBatchProps) {
  const [errors, setErrors] = useState<ErrorItem[]>([
    { id: "1", error: "", severity: "medium" },
  ]);
  const [bulkInput, setBulkInput] = useState("");
  const [showBulkInput, setShowBulkInput] = useState(false);

  const addError = () => {
    setErrors([
      ...errors,
      { id: Date.now().toString(), error: "", severity: "medium" },
    ]);
  };

  const removeError = (id: string) => {
    if (errors.length > 1) {
      setErrors(errors.filter((e) => e.id !== id));
    }
  };

  const updateError = (id: string, field: keyof ErrorItem, value: any) => {
    setErrors(
      errors.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleBulkImport = () => {
    const lines = bulkInput
      .split("\n")
      .filter((line) => line.trim())
      .map((line, index) => ({
        id: `bulk-${Date.now()}-${index}`,
        error: line.trim(),
        severity: "medium" as const,
      }));

    if (lines.length > 0) {
      setErrors(lines);
      setBulkInput("");
      setShowBulkInput(false);
    }
  };

  const handleAnalyze = () => {
    const validErrors = errors
      .filter((e) => e.error.trim())
      .map((e) => e.error);
    
    if (validErrors.length > 0) {
      onAnalyze(validErrors);
      onClose();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setBulkInput(content);
        setShowBulkInput(true);
      };
      reader.readAsText(file);
    }
  };

  const severityColors = {
    low: "border-blue-500/30 bg-blue-500/10",
    medium: "border-yellow-500/30 bg-yellow-500/10",
    high: "border-red-500/30 bg-red-500/10",
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-surface border border-primary/30 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-primary/20 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="text-primary" size={24} />
                Batch Error Analysis
              </h2>
              <p className="text-sm opacity-70 mt-1">
                Analyze multiple errors simultaneously
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setShowBulkInput(false)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  !showBulkInput
                    ? "bg-primary text-background"
                    : "bg-surface-light hover:bg-primary/10"
                }`}
              >
                Individual Errors
              </button>
              <button
                onClick={() => setShowBulkInput(true)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  showBulkInput
                    ? "bg-primary text-background"
                    : "bg-surface-light hover:bg-primary/10"
                }`}
              >
                Bulk Import
              </button>
              <label className="px-4 py-2 rounded-lg bg-surface-light hover:bg-primary/10 transition-all cursor-pointer flex items-center gap-2">
                <Upload size={16} />
                Upload File
                <input
                  type="file"
                  accept=".txt,.log,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Individual Error Inputs */}
            {!showBulkInput && (
              <div className="space-y-3">
                {errors.map((errorItem, index) => (
                  <motion.div
                    key={errorItem.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`border rounded-lg p-4 ${
                      severityColors[errorItem.severity]
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-3">
                        <textarea
                          value={errorItem.error}
                          onChange={(e) =>
                            updateError(errorItem.id, "error", e.target.value)
                          }
                          placeholder="Paste error message, stack trace, or log output..."
                          className="w-full bg-background/50 border border-primary/20 rounded-lg p-3 resize-none focus:outline-none focus:border-primary/50 transition-colors"
                          rows={3}
                        />
                        <div className="flex items-center gap-2">
                          <label className="text-xs font-medium text-foreground/90">Severity:</label>
                          <select
                            value={errorItem.severity}
                            onChange={(e) =>
                              updateError(
                                errorItem.id,
                                "severity",
                                e.target.value
                              )
                            }
                            className="bg-background/50 border border-primary/20 rounded px-2 py-1 text-xs font-medium text-foreground focus:outline-none focus:border-primary/50 cursor-pointer hover:bg-background/70 transition-colors"
                          >
                            <option value="low" className="bg-background text-foreground">Low</option>
                            <option value="medium" className="bg-background text-foreground">Medium</option>
                            <option value="high" className="bg-background text-foreground">High</option>
                          </select>
                        </div>
                      </div>
                      {errors.length > 1 && (
                        <button
                          onClick={() => removeError(errorItem.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addError}
                  className="w-full py-3 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Plus size={16} />
                  Add Another Error
                </motion.button>
              </div>
            )}

            {/* Bulk Import */}
            {showBulkInput && (
              <div className="space-y-4">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm">
                  <AlertCircle size={16} className="inline mr-2" />
                  Paste multiple errors separated by new lines. Each line will be
                  analyzed as a separate error.
                </div>
                <textarea
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  placeholder="Error 1: TypeError: Cannot read property...&#10;Error 2: SyntaxError: Unexpected token...&#10;Error 3: ReferenceError: foo is not defined..."
                  className="w-full bg-background/50 border border-primary/20 rounded-lg p-4 resize-none focus:outline-none focus:border-primary/50 transition-colors font-mono text-sm"
                  rows={15}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBulkImport}
                  disabled={!bulkInput.trim()}
                  className="w-full py-3 bg-primary text-background rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all"
                >
                  Import {bulkInput.split("\n").filter((l) => l.trim()).length}{" "}
                  Errors
                </motion.button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-primary/20 flex justify-between items-center">
            <div className="text-sm opacity-70">
              {errors.filter((e) => e.error.trim()).length} error(s) ready to
              analyze
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg border border-primary/30 hover:bg-primary/10 transition-all"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAnalyze}
                disabled={errors.filter((e) => e.error.trim()).length === 0}
                className="px-6 py-2.5 rounded-lg bg-primary text-background font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <Zap size={16} />
                Analyze All
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
