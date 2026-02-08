/**
 * Smart Context Auto-Detection
 * Automatically detects project framework, language, dependencies, and environment
 */

export interface ProjectContext {
  framework: string;
  language: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  runtime: string;
  packageManager: string;
  hasTypeScript: boolean;
  hasReact: boolean;
  hasNextJs: boolean;
  hasVue: boolean;
  hasAngular: boolean;
  hasNode: boolean;
  hasPython: boolean;
  detectedIssues: string[];
}

export class ContextDetector {
  private static instance: ContextDetector;
  private context: ProjectContext | null = null;

  private constructor() {}

  static getInstance(): ContextDetector {
    if (!ContextDetector.instance) {
      ContextDetector.instance = new ContextDetector();
    }
    return ContextDetector.instance;
  }

  /**
   * Auto-detect project context from various sources
   */
  async detectContext(): Promise<ProjectContext> {
    if (this.context) {
      return this.context;
    }

    const context: ProjectContext = {
      framework: 'Unknown',
      language: 'JavaScript',
      dependencies: {},
      devDependencies: {},
      runtime: this.detectRuntime(),
      packageManager: 'npm',
      hasTypeScript: false,
      hasReact: false,
      hasNextJs: false,
      hasVue: false,
      hasAngular: false,
      hasNode: true,
      hasPython: false,
      detectedIssues: [],
    };

    try {
      // Try to fetch package.json from the project
      const response = await fetch('/package.json');
      if (response.ok) {
        const packageJson = await response.json();
        this.analyzePackageJson(packageJson, context);
      }
    } catch (error) {
      // Package.json not accessible from client, use defaults
      context.detectedIssues.push('Could not read package.json');
    }

    // Detect from window/navigator
    this.detectBrowserContext(context);

    this.context = context;
    return context;
  }

  /**
   * Analyze package.json to extract context
   */
  private analyzePackageJson(packageJson: any, context: ProjectContext): void {
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    context.dependencies = packageJson.dependencies || {};
    context.devDependencies = packageJson.devDependencies || {};

    // Detect framework
    if (allDeps['next']) {
      context.framework = 'Next.js';
      context.hasNextJs = true;
      context.hasReact = true;
    } else if (allDeps['react']) {
      context.framework = 'React';
      context.hasReact = true;
    } else if (allDeps['vue']) {
      context.framework = 'Vue.js';
      context.hasVue = true;
    } else if (allDeps['@angular/core']) {
      context.framework = 'Angular';
      context.hasAngular = true;
    } else if (allDeps['express']) {
      context.framework = 'Express.js';
    } else if (allDeps['fastify']) {
      context.framework = 'Fastify';
    }

    // Detect language
    if (allDeps['typescript'] || packageJson.devDependencies?.['typescript']) {
      context.language = 'TypeScript';
      context.hasTypeScript = true;
    }

    // Detect package manager
    if (packageJson.packageManager) {
      context.packageManager = packageJson.packageManager.split('@')[0];
    }

    // Detect common issues
    this.detectDependencyIssues(allDeps, context);
  }

  /**
   * Detect browser and runtime context
   */
  private detectBrowserContext(context: ProjectContext): void {
    if (typeof window !== 'undefined') {
      // Check for common error tracking tools
      if ((window as any).Sentry) {
        context.detectedIssues.push('Sentry detected');
      }
      if ((window as any).Bugsnag) {
        context.detectedIssues.push('Bugsnag detected');
      }
    }
  }

  /**
   * Detect runtime environment
   */
  private detectRuntime(): string {
    if (typeof window !== 'undefined') {
      return 'Browser';
    }
    if (typeof process !== 'undefined' && process.versions?.node) {
      return `Node.js ${process.versions.node}`;
    }
    return 'Unknown';
  }

  /**
   * Detect common dependency issues
   */
  private detectDependencyIssues(
    deps: Record<string, string>,
    context: ProjectContext
  ): void {
    // Check for version conflicts
    if (deps['react'] && deps['next']) {
      const reactVersion = deps['react'];
      const nextVersion = deps['next'];
      
      // Next 13+ requires React 18+
      if (nextVersion.includes('13') || nextVersion.includes('14') || nextVersion.includes('15')) {
        if (!reactVersion.includes('18')) {
          context.detectedIssues.push('React version may be incompatible with Next.js version');
        }
      }
    }

    // Check for outdated dependencies
    if (deps['react'] && deps['react'].includes('^17')) {
      context.detectedIssues.push('React 17 detected - consider upgrading to React 18');
    }
  }

  /**
   * Get current context (cached)
   */
  getContext(): ProjectContext | null {
    return this.context;
  }

  /**
   * Force refresh context
   */
  async refreshContext(): Promise<ProjectContext> {
    this.context = null;
    return this.detectContext();
  }

  /**
   * Get contextual prompt enhancement for AI
   */
  getContextPrompt(): string {
    const ctx = this.context;
    if (!ctx) {
      return '';
    }

    let prompt = `\n\n📋 **Detected Project Context:**\n`;
    prompt += `- Framework: ${ctx.framework}\n`;
    prompt += `- Language: ${ctx.language}\n`;
    prompt += `- Runtime: ${ctx.runtime}\n`;
    
    if (ctx.hasTypeScript) {
      prompt += `- Using TypeScript\n`;
    }
    
    if (Object.keys(ctx.dependencies).length > 0) {
      prompt += `- Key Dependencies: ${Object.keys(ctx.dependencies).slice(0, 5).join(', ')}\n`;
    }

    if (ctx.detectedIssues.length > 0) {
      prompt += `\n⚠️ **Detected Issues:**\n`;
      ctx.detectedIssues.forEach(issue => {
        prompt += `- ${issue}\n`;
      });
    }

    prompt += `\nPlease provide ${ctx.framework}-specific solutions when applicable.\n`;

    return prompt;
  }

  /**
   * Extract context from error message
   */
  extractErrorContext(errorMessage: string): {
    fileName?: string;
    lineNumber?: number;
    columnNumber?: number;
    errorType?: string;
    framework?: string;
  } {
    const context: any = {};

    // Extract file path
    const fileMatch = errorMessage.match(/at\s+(?:.*?\s+\()?([^\s\)]+\.(ts|tsx|js|jsx|vue|py|java)):(\d+):(\d+)/i);
    if (fileMatch) {
      context.fileName = fileMatch[1];
      context.lineNumber = parseInt(fileMatch[3]);
      context.columnNumber = parseInt(fileMatch[4]);
    }

    // Extract error type
    const errorTypeMatch = errorMessage.match(/^(\w+Error):/);
    if (errorTypeMatch) {
      context.errorType = errorTypeMatch[1];
    }

    // Detect framework from error
    if (errorMessage.includes('React') || errorMessage.includes('useState') || errorMessage.includes('useEffect')) {
      context.framework = 'React';
    } else if (errorMessage.includes('Vue') || errorMessage.includes('v-model')) {
      context.framework = 'Vue';
    } else if (errorMessage.includes('Angular') || errorMessage.includes('ng-')) {
      context.framework = 'Angular';
    }

    return context;
  }
}

/**
 * Hook to use context detection in React components
 */
export function useContextDetection() {
  const [context, setContext] = React.useState<ProjectContext | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const detector = ContextDetector.getInstance();
    detector.detectContext().then(ctx => {
      setContext(ctx);
      setIsLoading(false);
    });
  }, []);

  const refreshContext = async () => {
    setIsLoading(true);
    const detector = ContextDetector.getInstance();
    const ctx = await detector.refreshContext();
    setContext(ctx);
    setIsLoading(false);
  };

  return { context, isLoading, refreshContext };
}

// Make sure to import React at the top
import React from 'react';
