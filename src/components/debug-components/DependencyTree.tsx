"use client";

import React from "react";
import { motion } from "framer-motion";
import { Package, AlertTriangle, Check } from "lucide-react";

interface ConflictingPackage {
  name: string;
  currentVersion: string;
  requiredVersions: string[];
  dependents: string[];
}

interface DependencyTreeProps {
  conflictingPackages: ConflictingPackage[];
  recommendedFix: string;
}

export function DependencyTree({
  conflictingPackages,
  recommendedFix,
}: DependencyTreeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-warning/30 rounded-lg p-6 bg-surface/50 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
          <Package className="text-warning" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Dependency Conflict Detected</h3>
          <p className="text-xs opacity-70">
            {conflictingPackages.length} package(s) have version conflicts
          </p>
        </div>
      </div>

      {/* Conflicting Packages */}
      <div className="space-y-4 mb-6">
        {conflictingPackages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-warning/20 rounded-lg p-4 bg-warning/5"
          >
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="text-warning mt-1 flex-shrink-0" size={20} />
              <div className="flex-1">
                <div className="font-mono font-semibold text-sm mb-1">
                  {pkg.name}
                </div>
                <div className="text-xs opacity-70">
                  Current: <span className="font-mono">{pkg.currentVersion}</span>
                </div>
              </div>
            </div>

            {/* Required Versions */}
            <div className="ml-8 space-y-2">
              <div className="text-xs font-semibold opacity-70">
                Required by:
              </div>
              {pkg.dependents.map((dependent, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs font-mono bg-surface/50 p-2 rounded"
                >
                  <div className="w-2 h-2 rounded-full bg-warning"></div>
                  <span className="flex-1">{dependent}</span>
                  <span className="text-warning">
                    {pkg.requiredVersions[idx] || "any"}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommended Fix */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="border border-success/30 rounded-lg p-4 bg-success/5"
      >
        <div className="flex items-center gap-2 mb-2">
          <Check className="text-success" size={18} />
          <h4 className="font-semibold text-sm">Recommended Solution</h4>
        </div>
        <pre className="text-xs font-mono bg-background/50 p-3 rounded overflow-x-auto">
          <code>{recommendedFix}</code>
        </pre>
      </motion.div>
    </motion.div>
  );
}
