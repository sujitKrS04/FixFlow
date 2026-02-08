import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format error type for display
 */
export function formatErrorType(errorType: string): string {
  return errorType
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toUpperCase();
}

/**
 * Extract error type from error message
 */
export function extractErrorType(message: string): string {
  const match = message.match(/^(\w+Error):/);
  return match ? match[1] : "Error";
}

/**
 * Parse stack trace string into frames
 */
export function parseStackTrace(stackTrace: string) {
  const lines = stackTrace.split("\n").filter((line) => line.trim());
  const frames = [];

  for (const line of lines) {
    // Match common stack trace formats
    const match = line.match(
      /at\s+(?:(.+?)\s+\()?(.+?):(\d+):(\d+)\)?$/
    );
    if (match) {
      const [, functionName, file, line, column] = match;
      frames.push({
        functionName: functionName || "anonymous",
        file: file.trim(),
        line: parseInt(line),
        column: parseInt(column),
        code: "", // Would need file reading to populate
        isErrorOrigin: false,
      });
    }
  }

  // Mark first frame as error origin
  if (frames.length > 0) {
    frames[0].isErrorOrigin = true;
  }

  return frames;
}

/**
 * Detect programming language from file extension
 */
export function detectLanguage(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase();
  const languageMap: Record<string, string> = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    py: "python",
    java: "java",
    cpp: "cpp",
    c: "c",
    cs: "csharp",
    go: "go",
    rs: "rust",
    php: "php",
    rb: "ruby",
    swift: "swift",
    kt: "kotlin",
    scala: "scala",
  };
  return languageMap[ext || ""] || "text";
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format timestamp for display
 */
export function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}
