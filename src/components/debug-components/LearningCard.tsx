"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, CheckCircle2, Lightbulb } from "lucide-react";

interface RelatedDoc {
  title: string;
  url: string;
}

interface LearningCardProps {
  title: string;
  explanation: string;
  prevention?: string[];
  relatedDocs?: RelatedDoc[];
}

export function LearningCard({
  title,
  explanation,
  prevention = [],
  relatedDocs,
}: LearningCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-accent/30 rounded-lg p-6 bg-surface/50 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
          <BookOpen className="text-accent" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm opacity-80 leading-relaxed">{explanation}</p>
        </div>
      </div>

      {/* Prevention Tips */}
      {prevention.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="text-warning" size={18} />
            <h4 className="font-semibold text-sm">Prevention Tips</h4>
          </div>
          <div className="space-y-2">
            {prevention.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-sm p-3 bg-accent/5 rounded-lg border-l-2 border-accent"
              >
                <CheckCircle2 size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="opacity-90">{tip}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Related Documentation */}
      {relatedDocs && relatedDocs.length > 0 && (
        <div>
          <h4 className="font-semibold text-sm mb-3 opacity-70">Related Resources</h4>
          <div className="space-y-2">
            {relatedDocs.map((doc, index) => (
              <motion.a
                key={index}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-2 text-sm p-2 rounded hover:bg-accent/10 transition-colors group"
              >
                <ExternalLink size={14} className="text-accent group-hover:scale-110 transition-transform" />
                <span className="text-accent hover:underline">{doc.title}</span>
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
