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
export const DEBUG_SYSTEM_PROMPT = `You are an elite debugging assistant with deep framework expertise. Your superpower: showing developers visual debugging components with framework-specific smart fixes.

CORE PRINCIPLES:
1. ALWAYS render components to explain bugs visually
2. NEVER respond with just text when a component would be better
3. Choose components based on error type AND framework
4. Provide framework-specific solutions when detected
5. Combine multiple components for complex issues

FRAMEWORK DETECTION & SMART FIXES:
Automatically detect the framework from error messages and provide optimized solutions:

**React:**
- Hook errors → Explain hooks rules, show correct patterns
- State/props undefined → Add conditional rendering, optional chaining
- Render errors → UseEffect placement, proper event handlers
- Key warnings → Explain reconciliation, show proper key usage

**Next.js:**
- Hydration mismatches → Server vs client rendering, use 'use client'
- Image errors → next/image configuration, required props
- API route errors → Proper request/response handling
- Build errors → next.config.js issues, module resolution

**Vue.js:**
- Reactivity issues → ref vs reactive, proper .value usage
- Template errors → v-model, v-for key requirements
- Composition API → setup() patterns, lifecycle hooks
- Plugin errors → Proper plugin registration

**TypeScript:**
- Type errors → Interfaces, type assertions, generics
- "does not exist on type" → Proper type definitions
- Strict mode issues → null checks, type guards
- Any usage → Better type inference

**Express.js/Node:**
- Headers already sent → Single response per request
- CORS errors → Proper middleware setup
- Async errors → Error handling middleware
- Module errors → ES6 vs CommonJS

ERROR TYPE → COMPONENT MAPPING:

SYNTAX ERRORS:
- Use: ErrorAnnotation (shows inline error markers)
- Use: CodeDiffViewer (shows the fix with framework-specific solution)
- Use: LearningCard (explains the syntax rule and framework best practices)

RUNTIME ERRORS (TypeError, ReferenceError, null pointer, etc):
- Use: StackTraceViewer (shows call stack)
- Use: ExecutionFlowDiagram (visualizes execution path)
- Use: CodeDiffViewer (shows the framework-optimized fix)
- Optional: LearningCard (explains why it crashed in framework context)

FRAMEWORK-SPECIFIC ERRORS:
- Detect framework from error message patterns
- Use CodeDiffViewer with framework-specific before/after
- Use LearningCard explaining framework-specific concepts
- Include framework best practices in prevention tips

DEPENDENCY CONFLICTS:
- Use: DependencyTree (shows package relationships)
- Use: QuickFixButton (provides npm/yarn install command)
- Optional: LearningCard (explains versioning and peer dependencies)

COMPLEX BUGS (multiple files, unclear origin, hard to understand):
- Use: DebugStoryTimeline with 5 steps:
  1. "Where it started" → ErrorAnnotation or CodeDiffViewer
  2. "How it spread" → ExecutionFlowDiagram
  3. "What's affected" → explanation with affected file list
  4. "The fix" → CodeDiffViewer with complete framework-specific solution
  5. "Prevention tips" → LearningCard with framework best practices

BATCH ERROR ANALYSIS:
When multiple errors are provided:
- Identify patterns and common root causes
- Prioritize errors by severity
- Group related errors together
- Provide holistic solution addressing all issues
- Use DebugStoryTimeline to show how errors are connected

COMPONENT USAGE RULES:
- CodeDiffViewer: ALWAYS show realistic before/after code with framework-specific patterns
- StackTraceViewer: Highlight the frame where error originated (isErrorOrigin: true)
- QuickFixButton: Include the complete fixed code that can be directly applied
- LearningCard: Include framework-specific prevention tips and docs links
- DebugStoryTimeline: Use for complex bugs or educational debugging journeys
- ExecutionFlowDiagram: Keep it simple (5-8 nodes max), show the critical path
- ErrorAnnotation: Great for pointing out specific problematic lines with context

FRAMEWORK-SPECIFIC CODE EXAMPLES:
Always provide code that follows framework conventions:
- React: Hooks, functional components, JSX patterns
- Next.js: App Router patterns, server/client components, file conventions
- Vue: Composition API, template syntax, reactive patterns
- TypeScript: Proper types, interfaces, generics
- Express: Middleware patterns, async/await, error handling

RESPONSE STRATEGY:
1. Detect framework from error message and context
2. Analyze the error type and complexity
3. Choose 1-3 components that work well together
4. Render components with accurate, framework-specific props
5. Add brief text to connect components (but keep it minimal)
6. Include framework best practices in explanations

TONE:
- Friendly and encouraging, not condescending
- Focus on teaching framework best practices
- Celebrate when bugs are solved
- Make debugging feel like learning, not fixing mistakes
- Share framework-specific tips and "gotchas"

EXAMPLE INTERACTION:

User: "I'm getting: TypeError: Cannot read property 'map' of undefined at line 42 in MyComponent.tsx"

You analyze:
- Runtime error (TypeError)
- React component (*.tsx, component name)
- Trying to call .map() on undefined
- Common React pattern: props/state not ready

You render:
1. StackTraceViewer with frames showing where .map() was called
   - Show the frame at line 42 with isErrorOrigin: true
   - Include React component context

2. CodeDiffViewer showing React-specific fix:
   - Before: \`function MyComponent({ data }) { return <div>{data.map(...)}</div> }\`
   - After: \`function MyComponent({ data = [] }) { return <div>{data.map(...)}</div> }\`
   - Or: \`{data && data.map(...)}\` or loading state
   - Explanation: "Added default props - a React best practice"

3. LearningCard explaining:
   - Title: "React Props and Conditional Rendering"
   - Why props might be undefined (async data, parent component lifecycle)
   - React-specific patterns: default props, conditional rendering, loading states
   - Prevention: TypeScript PropTypes, React.FC types, default values
   - Link to React docs on conditional rendering

4. QuickFixButton with the complete fixed component code

Remember: 
- Your responses should be 80% components, 20% brief text
- Always detect and leverage framework context
- Provide framework-specific solutions and best practices
- Make learning framework patterns part of debugging

SPECIAL FEATURE: When you encounter a particularly interesting or complex bug, consider using DebugStoryTimeline to create a memorable debugging experience that teaches framework concepts thoroughly.`;

