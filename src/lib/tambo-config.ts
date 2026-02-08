import { type TamboComponent } from "@tambo-ai/react";
import { z } from "zod";

// Import all debug components
import { CodeDiffViewer } from "@/components/debug-components/CodeDiffViewer";
import { StackTraceViewer } from "@/components/debug-components/StackTraceViewer";
import { DependencyTree } from "@/components/debug-components/DependencyTree";
import { ExecutionFlowDiagram } from "@/components/debug-components/ExecutionFlowDiagram";
import { QuickFixButton } from "@/components/debug-components/QuickFixButton";
import { LearningCard } from "@/components/debug-components/LearningCard";
import { DebugStoryTimeline } from "@/components/debug-components/DebugStoryTimeline";
import { ErrorAnnotation } from "@/components/debug-components/ErrorAnnotation";

// Register all components with Tambo
export const debugComponents: TamboComponent[] = [
  {
    name: "CodeDiffViewer",
    description:
      "Shows side-by-side code comparison with syntax highlighting. Use when you need to show the before/after of a code fix. Perfect for demonstrating what changed to fix the bug.",
    component: CodeDiffViewer,
    propsSchema: z.object({
      original: z.string().describe("The buggy code before the fix"),
      fixed: z.string().describe("The corrected code after the fix"),
      language: z
        .string()
        .describe(
          "Programming language (javascript, typescript, python, java, etc)"
        ),
      fileName: z.string().describe("Name of the file being fixed"),
      explanation: z
        .string()
        .optional()
        .describe("Brief explanation of what was fixed and why"),
    }),
  },
  {
    name: "StackTraceViewer",
    description:
      "Interactive stack trace viewer with collapsible frames and code snippets. Use for runtime errors, exceptions, and crashes. Shows the complete call stack with the error origin highlighted.",
    component: StackTraceViewer,
    propsSchema: z.object({
      frames: z.array(
        z.object({
          file: z.string().describe("File path where this frame is located"),
          line: z.number().describe("Line number in the file"),
          column: z
            .number()
            .optional()
            .describe("Column number (if available)"),
          functionName: z
            .string()
            .describe("Name of the function being called"),
          code: z
            .string()
            .describe("The code snippet at this frame location"),
          isErrorOrigin: z
            .boolean()
            .optional()
            .describe(
              "Set to true if this frame is where the error originated (will be highlighted)"
            ),
        })
      ),
      errorMessage: z.string().describe("The error message text"),
      errorType: z
        .string()
        .describe("Error type like TypeError, ReferenceError, SyntaxError, etc"),
    }),
  },
  {
    name: "DependencyTree",
    description:
      "Visual tree showing package dependencies and version conflicts. Use for npm/yarn/pip dependency resolution issues, version mismatches, and package conflicts.",
    component: DependencyTree,
    propsSchema: z.object({
      conflictingPackages: z.array(
        z.object({
          name: z.string().describe("Package name"),
          currentVersion: z.string().describe("Currently installed version"),
          requiredVersions: z
            .array(z.string())
            .describe("Array of required versions by different dependents"),
          dependents: z
            .array(z.string())
            .describe("Which packages require this dependency"),
        })
      ),
      recommendedFix: z
        .string()
        .describe(
          "Suggested resolution command (e.g., npm install package@version)"
        ),
    }),
  },
  {
    name: "ExecutionFlowDiagram",
    description:
      "Animated flow diagram showing code execution path with visual node connections. Use to visualize where execution failed, show program flow, or explain how code runs step by step.",
    component: ExecutionFlowDiagram,
    propsSchema: z.object({
      nodes: z.array(
        z.object({
          id: z.string().describe("Unique identifier for this node"),
          label: z.string().describe("Text label to display in the node"),
          type: z
            .enum(["start", "function", "condition", "error", "end"])
            .describe("Type of node - determines the icon and styling"),
        })
      ),
      edges: z.array(
        z.object({
          from: z.string().describe("ID of the source node"),
          to: z.string().describe("ID of the target node"),
          label: z
            .string()
            .optional()
            .describe("Optional label for the edge (e.g., 'true', 'false')"),
        })
      ),
      errorNodeId: z
        .string()
        .describe("ID of the node where the error occurred (will be highlighted)"),
    }),
  },
  {
    name: "QuickFixButton",
    description:
      "Interactive button that provides one-click fix application with loading states and success animations. Shows copy, download, and apply options. Use when you have a complete fix ready.",
    component: QuickFixButton,
    propsSchema: z.object({
      patchCode: z
        .string()
        .describe("The complete fixed code that will be applied"),
      fileName: z.string().describe("Name of the file to be patched"),
      description: z
        .string()
        .describe("User-friendly description of what this fix does"),
    }),
  },
  {
    name: "LearningCard",
    description:
      "Educational card explaining why a bug happened and how to prevent it. Use in learning mode or when the user asks 'why'. Includes prevention tips and related documentation links.",
    component: LearningCard,
    propsSchema: z.object({
      title: z.string().describe("Title of the learning concept"),
      explanation: z
        .string()
        .describe(
          "Detailed explanation of why this error happens and the underlying concept"
        ),
      prevention: z
        .array(z.string())
        .optional()
        .describe(
          "Array of tips to prevent this error in the future (3-5 tips recommended)"
        ),
      relatedDocs: z
        .array(
          z.object({
            title: z.string(),
            url: z.string().url(),
          })
        )
        .optional()
        .describe(
          "Links to official documentation, MDN, Stack Overflow, or blog posts"
        ),
    }),
  },
  {
    name: "DebugStoryTimeline",
    description:
      "Multi-step visual debugging story that guides users through the complete debugging journey. This is your SIGNATURE FEATURE! Use this for complex bugs or first-time users. Shows: 1) Where it started, 2) How it spread, 3) What's affected, 4) The fix, 5) Prevention. Creates an engaging narrative.",
    component: DebugStoryTimeline,
    propsSchema: z.object({
      steps: z.array(
        z.object({
          title: z.string().describe("Step title (e.g., 'Where it started')"),
          description: z
            .string()
            .describe("Brief description of what this step shows"),
          componentType: z
            .enum(["code", "diagram", "explanation", "fix", "annotation"])
            .describe("Which type of component to render in this step"),
          componentData: z
            .any()
            .describe(
              "Props object for the component - structure depends on componentType"
            ),
        })
      ),
    }),
  },
  {
    name: "ErrorAnnotation",
    description:
      "Shows code with inline annotations pointing out errors, warnings, or info. Use for syntax errors, linting issues, or when you need to point out specific lines. Displays code with line numbers and visual markers.",
    component: ErrorAnnotation,
    propsSchema: z.object({
      code: z.string().describe("The complete code to display"),
      language: z
        .string()
        .describe("Programming language for syntax highlighting"),
      annotations: z.array(
        z.object({
          line: z.number().describe("Line number to annotate (1-indexed)"),
          message: z.string().describe("Annotation message to display"),
          severity: z
            .enum(["error", "warning", "info"])
            .describe("Severity level - determines icon and color"),
        })
      ),
    }),
  },
];

// Optional: Define custom tools that run in the browser
export const debugTools = [
  {
    name: "downloadPatch",
    description: "Generate and download a patch file for the fix",
    execute: async ({ code, fileName }: { code: string; fileName: string }) => {
      const blob = new Blob([code], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.patch`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return { success: true, message: "Patch downloaded successfully!" };
    },
  },
  {
    name: "copyToClipboard",
    description: "Copy code to clipboard",
    execute: async ({ text }: { text: string }) => {
      await navigator.clipboard.writeText(text);
      return { success: true, message: "Copied to clipboard!" };
    },
  },
];

// System prompt for the Tambo AI agent
export const DEBUG_SYSTEM_PROMPT = `You are an elite debugging assistant. Your superpower: showing developers visual debugging components instead of walls of text.

CORE PRINCIPLES:
1. ALWAYS render components to explain bugs visually
2. NEVER respond with just text when a component would be better
3. Choose components based on error type
4. Combine multiple components for complex issues

ERROR TYPE → COMPONENT MAPPING:

SYNTAX ERRORS:
- Use: ErrorAnnotation (shows inline error markers)
- Use: CodeDiffViewer (shows the fix)
- Use: LearningCard (explains the syntax rule)

RUNTIME ERRORS (TypeError, ReferenceError, null pointer, etc):
- Use: StackTraceViewer (shows call stack)
- Use: ExecutionFlowDiagram (visualizes execution path)
- Use: CodeDiffViewer (shows the fix)
- Optional: LearningCard (explains why it crashed)

DEPENDENCY CONFLICTS:
- Use: DependencyTree (shows package relationships)
- Use: QuickFixButton (provides npm install command)
- Optional: LearningCard (explains versioning)

COMPLEX BUGS (multiple files, unclear origin, hard to understand):
- Use: DebugStoryTimeline with 5 steps:
  1. "Where it started" → ErrorAnnotation or CodeDiffViewer
  2. "How it spread" → ExecutionFlowDiagram
  3. "What's affected" → explanation with affected file list
  4. "The fix" → CodeDiffViewer with complete solution
  5. "Prevention tips" → LearningCard with best practices

COMPONENT USAGE RULES:
- CodeDiffViewer: ALWAYS show realistic before/after code with proper syntax
- StackTraceViewer: Highlight the frame where error originated (isErrorOrigin: true)
- QuickFixButton: Include the complete fixed code in patchCode prop
- LearningCard: Use when user asks "why" or when error is common/educational
- DebugStoryTimeline: Use for first-time users or complex multi-step bugs
- ExecutionFlowDiagram: Keep it simple (5-8 nodes max), show the critical path
- ErrorAnnotation: Great for pointing out specific problematic lines

RESPONSE STRATEGY:
1. Analyze the error type and complexity
2. Choose 1-3 components that work well together
3. Render components with accurate, helpful props
4. Add brief text to connect components (but keep it minimal)

TONE:
- Friendly and encouraging, not condescending
- Focus on teaching, not just fixing
- Celebrate when bugs are solved
- Make debugging feel like an adventure, not a chore

EXAMPLE INTERACTION:

User: "I'm getting: TypeError: Cannot read property 'map' of undefined at line 42"

You analyze:
- Runtime error (TypeError)
- Trying to call .map() on undefined
- Common beginner mistake with undefined data

You render:
1. StackTraceViewer with frames showing where .map() was called
   - Show the frame at line 42 with isErrorOrigin: true
   - Include code context showing the problematic line

2. CodeDiffViewer showing:
   - Before: \`data.map(item => ...)\`
   - After: \`data?.map(item => ...) || []\` or \`{data && data.map(item => ...)}\`
   - Explanation: "Added optional chaining to safely handle undefined"

3. LearningCard explaining:
   - Title: "Understanding Undefined and Optional Chaining"
   - Explanation of why data might be undefined (async loading, etc)
   - Prevention: Always check data existence, use optional chaining, provide defaults
   - Link to MDN docs on optional chaining

4. QuickFixButton with the complete fixed code

Remember: Your responses should be 80% components, 20% brief text explanations. Let the visuals do the teaching!

SPECIAL FEATURE: When you encounter a particularly interesting or complex bug, consider using DebugStoryTimeline to create a memorable debugging experience that teaches the user thoroughly.`;
