"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Check,
  MapPin,
  MoveRight,
  Target,
  Wrench,
  Shield,
} from "lucide-react";
import { CodeDiffViewer } from "./CodeDiffViewer";
import { ExecutionFlowDiagram } from "./ExecutionFlowDiagram";
import { ErrorAnnotation } from "./ErrorAnnotation";
import { LearningCard } from "./LearningCard";

interface StoryStep {
  title: string;
  description: string;
  componentType: "code" | "diagram" | "explanation" | "fix" | "annotation";
  componentData: any;
}

interface DebugStoryTimelineProps {
  steps: StoryStep[];
}

const stepIcons = {
  0: MapPin,
  1: MoveRight,
  2: Target,
  3: Wrench,
  4: Shield,
};

export function DebugStoryTimeline({ steps }: DebugStoryTimelineProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const renderStepComponent = (step: StoryStep) => {
    switch (step.componentType) {
      case "code":
      case "fix":
        return (
          <CodeDiffViewer
            original={step.componentData.original}
            fixed={step.componentData.fixed}
            language={step.componentData.language}
            fileName={step.componentData.fileName}
            explanation={step.componentData.explanation}
          />
        );
      case "diagram":
        return (
          <ExecutionFlowDiagram
            nodes={step.componentData.nodes}
            edges={step.componentData.edges}
            errorNodeId={step.componentData.errorNodeId}
          />
        );
      case "annotation":
        return (
          <ErrorAnnotation
            code={step.componentData.code}
            language={step.componentData.language}
            annotations={step.componentData.annotations}
          />
        );
      case "explanation":
        return (
          <LearningCard
            title={step.componentData.title}
            explanation={step.componentData.explanation}
            prevention={step.componentData.prevention || []}
            relatedDocs={step.componentData.relatedDocs}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-secondary/30 rounded-lg p-6 bg-surface/50 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <span className="text-secondary">🎬</span>
          Visual Debugging Story
        </h2>
        <p className="text-sm opacity-70">
          Follow the complete journey from error to fix
        </p>
      </div>

      {/* Timeline Navigation */}
      <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
        {steps.map((step, index) => {
          const Icon = stepIcons[index as keyof typeof stepIcons] || ChevronRight;
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <React.Fragment key={index}>
              <button
                onClick={() => setCurrentStep(index)}
                className={`flex-shrink-0 flex flex-col items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  isCurrent
                    ? "bg-secondary/20 border-2 border-secondary"
                    : isCompleted
                    ? "bg-success/10 border border-success/30"
                    : "bg-surface border border-primary/20 opacity-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCurrent
                      ? "bg-secondary text-background"
                      : isCompleted
                      ? "bg-success text-background"
                      : "bg-surface border border-primary/30"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={20} />
                  ) : (
                    <Icon size={20} />
                  )}
                </div>
                <div className="text-xs font-semibold text-center min-w-[80px]">
                  Step {index + 1}
                </div>
              </button>

              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-8 ${
                    isCompleted ? "bg-success" : "bg-primary/20"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step Header */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">{steps[currentStep].title}</h3>
            <p className="text-sm opacity-80">{steps[currentStep].description}</p>
          </div>

          {/* Step Component */}
          <div className="mb-6">{renderStepComponent(steps[currentStep])}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-4 py-2 rounded-lg border border-primary/30 bg-surface hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
            >
              ← Previous
            </button>

            <div className="text-sm opacity-70">
              {currentStep + 1} of {steps.length}
            </div>

            <button
              onClick={() =>
                setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
              }
              disabled={currentStep === steps.length - 1}
              className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
            >
              Next →
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="mt-6 h-1 bg-surface rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-secondary to-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
