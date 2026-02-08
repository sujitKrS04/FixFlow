/**
 * Type definitions for FixFlow components
 */

export interface ErrorMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  components?: DebugComponent[];
}

export interface DebugComponent {
  type: ComponentType;
  props: any;
}

export type ComponentType =
  | "CodeDiffViewer"
  | "StackTraceViewer"
  | "DependencyTree"
  | "ExecutionFlowDiagram"
  | "QuickFixButton"
  | "LearningCard"
  | "DebugStoryTimeline"
  | "ErrorAnnotation";

export interface StackFrame {
  file: string;
  line: number;
  column?: number;
  functionName: string;
  code: string;
  isErrorOrigin?: boolean;
}

export interface Annotation {
  line: number;
  message: string;
  severity: "error" | "warning" | "info";
}

export interface FlowNode {
  id: string;
  label: string;
  type: "start" | "function" | "condition" | "error" | "end";
}

export interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ConflictingPackage {
  name: string;
  currentVersion: string;
  requiredVersions: string[];
  dependents: string[];
}

export interface RelatedDoc {
  title: string;
  url: string;
}

export interface DebugStoryStep {
  title: string;
  description: string;
  componentType: "code" | "diagram" | "explanation" | "fix" | "annotation";
  componentData: any;
}

export type Theme = "light" | "dark";

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  error: string;
  success: string;
  warning: string;
}
