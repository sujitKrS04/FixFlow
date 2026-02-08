/**
 * Framework-Specific Smart Fixes
 * Provides intelligent, context-aware fixes based on the detected framework
 */

export interface FrameworkFix {
  framework: string;
  errorPattern: RegExp;
  title: string;
  solution: string;
  codeExample?: {
    before: string;
    after: string;
  };
  explanation: string;
  preventionTips: string[];
}

export const frameworkFixes: FrameworkFix[] = [
  // React-specific fixes
  {
    framework: "React",
    errorPattern: /Cannot read property .* of undefined|undefined is not an object/i,
    title: "React Component State/Props Access Error",
    solution: "Add conditional rendering or optional chaining",
    codeExample: {
      before: `function MyComponent({ data }) {
  return (
    <div>
      {data.map(item => <Item key={item.id} {...item} />)}
    </div>
  );
}`,
      after: `function MyComponent({ data }) {
  if (!data) return <div>Loading...</div>;
  
  return (
    <div>
      {data.map(item => <Item key={item.id} {...item} />)}
    </div>
  );
}`,
    },
    explanation: "In React, props and state can be undefined during initial render or when data is loading asynchronously.",
    preventionTips: [
      "Always provide default props using destructuring: { data = [] }",
      "Use optional chaining: data?.map()",
      "Add loading states while data is fetching",
      "Use PropTypes or TypeScript for type safety",
    ],
  },
  {
    framework: "React",
    errorPattern: /Cannot update.*component.*while rendering/i,
    title: "React State Update During Render",
    solution: "Move state updates to useEffect or event handlers",
    codeExample: {
      before: `function MyComponent() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // ❌ Wrong!
  return <div>{count}</div>;
}`,
      after: `function MyComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setCount(count + 1); // ✅ Correct
  }, []);
  
  return <div>{count}</div>;
}`,
    },
    explanation: "React doesn't allow state updates during render as it causes infinite loops. State updates must happen in effects or event handlers.",
    preventionTips: [
      "Use useEffect for side effects and initialization",
      "Use event handlers for user interactions",
      "Never call setState directly in component body",
      "Consider if you need derived state instead",
    ],
  },
  {
    framework: "React",
    errorPattern: /React Hook .* is called conditionally/i,
    title: "React Hooks Rules Violation",
    solution: "Always call hooks at the top level",
    codeExample: {
      before: `function MyComponent({ shouldUseEffect }) {
  if (shouldUseEffect) {
    useEffect(() => { /* ... */ }); // ❌ Conditional hook
  }
  return <div>Content</div>;
}`,
      after: `function MyComponent({ shouldUseEffect }) {
  useEffect(() => {
    if (shouldUseEffect) { // ✅ Condition inside hook
      /* ... */
    }
  }, [shouldUseEffect]);
  
  return <div>Content</div>;
}`,
    },
    explanation: "React relies on consistent hook call order across renders. Conditional hooks break this guarantee.",
    preventionTips: [
      "Always call hooks at component top level",
      "Move conditions inside hooks, not around them",
      "Use ESLint plugin: eslint-plugin-react-hooks",
      "Extract complex logic to custom hooks",
    ],
  },

  // Next.js-specific fixes
  {
    framework: "Next.js",
    errorPattern: /Text content does not match server-rendered HTML|Hydration failed/i,
    title: "Next.js Hydration Mismatch",
    solution: "Ensure server and client render the same content initially",
    codeExample: {
      before: `export default function Page() {
  return <div>{new Date().toISOString()}</div> // ❌ Different on server/client
}`,
      after: `'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [date, setDate] = useState<string | null>(null);
  
  useEffect(() => {
    setDate(new Date().toISOString()); // ✅ Client-only
  }, []);
  
  return <div>{date || 'Loading...'}</div>;
}`,
    },
    explanation: "Next.js pre-renders on server. Time, random numbers, or browser APIs differ between server and client.",
    preventionTips: [
      "Use 'use client' directive for client-only components",
      "Defer client-specific rendering to useEffect",
      "Check for 'typeof window !== undefined' before using browser APIs",
      "Use next/dynamic for components that need browser features",
    ],
  },
  {
    framework: "Next.js",
    errorPattern: /Cannot read property '.*' of null.*Image/i,
    title: "Next.js Image Component Error",
    solution: "Properly configure next/image with required props",
    codeExample: {
      before: `import Image from 'next/image';
<Image src="/photo.jpg" /> // ❌ Missing required props`,
      after: `import Image from 'next/image';
<Image 
  src="/photo.jpg" 
  alt="Description"
  width={500}
  height={300}
/> // ✅ All required props`,
    },
    explanation: "Next.js Image requires width/height for optimization, and alt for accessibility.",
    preventionTips: [
      "Always provide width, height, and alt",
      "Use 'fill' prop for responsive images with object-fit",
      "Configure remotePatterns in next.config.js for external images",
      "Consider using placeholder='blur' for better UX",
    ],
  },

  // Vue.js-specific fixes
  {
    framework: "Vue.js",
    errorPattern: /Cannot read property '\$.*' of undefined/i,
    title: "Vue Instance Property Access Error",
    solution: "Ensure proper component lifecycle and data initialization",
    codeExample: {
      before: `export default {
  methods: {
    fetchData() {
      this.$axios.get('/api/data') // ❌ $axios might not exist
    }
  }
}`,
      after: `export default {
  methods: {
    async fetchData() {
      if (!this.$axios) {
        console.error('axios plugin not installed');
        return;
      }
      const { data } = await this.$axios.get('/api/data');
      return data;
    }
  }
}`,
    },
    explanation: "Vue plugins and instance properties must be registered before use.",
    preventionTips: [
      "Check plugin registration in main.js/ts",
      "Use optional chaining for plugin properties",
      "Initialize data properties in data() function",
      "Use TypeScript for better type safety",
    ],
  },

  // Node.js/Express-specific fixes
  {
    framework: "Express.js",
    errorPattern: /Cannot set headers after they are sent/i,
    title: "Express Multiple Response Headers Error",
    solution: "Ensure only one response is sent per request",
    codeExample: {
      before: `app.get('/api/data', (req, res) => {
  res.json({ data: 'value' });
  res.status(200).send('Done'); // ❌ Second response
});`,
      after: `app.get('/api/data', (req, res) => {
  return res.json({ data: 'value' }); // ✅ Single response with return
});`,
    },
    explanation: "HTTP allows only one response per request. Sending multiple responses causes this error.",
    preventionTips: [
      "Always use 'return' when sending response",
      "Check for early returns in conditional logic",
      "Avoid res.send() after async operations complete",
      "Use middleware correctly to prevent double responses",
    ],
  },

  // TypeScript-specific fixes
  {
    framework: "TypeScript",
    errorPattern: /Property '.*' does not exist on type/i,
    title: "TypeScript Type Safety Error",
    solution: "Add proper type definitions or use type assertions",
    codeExample: {
      before: `const user = JSON.parse(data);
console.log(user.name); // ❌ 'name' doesn't exist on type 'any'`,
      after: `interface User {
  name: string;
  email: string;
}

const user: User = JSON.parse(data);
console.log(user.name); // ✅ Type-safe`,
    },
    explanation: "TypeScript requires explicit types for properties to ensure type safety.",
    preventionTips: [
      "Define interfaces for complex objects",
      "Use type guards for runtime type checking",
      "Enable strict mode in tsconfig.json",
      "Use Zod or io-ts for runtime validation",
    ],
  },
];

/**
 * Get framework-specific fixes for an error
 */
export function getFrameworkFixes(
  framework: string,
  errorMessage: string
): FrameworkFix[] {
  return frameworkFixes.filter(
    (fix) =>
      fix.framework === framework &&
      fix.errorPattern.test(errorMessage)
  );
}

/**
 * Get all fixes for a framework
 */
export function getFrameworkAllFixes(framework: string): FrameworkFix[] {
  return frameworkFixes.filter((fix) => fix.framework === framework);
}

/**
 * Detect likely framework from error message
 */
export function detectFrameworkFromError(errorMessage: string): string | null {
  if (errorMessage.includes("React") || errorMessage.includes("useState") || errorMessage.includes("useEffect")) {
    return "React";
  }
  if (errorMessage.includes("Next.js") || errorMessage.includes("next/") || errorMessage.includes("hydration")) {
    return "Next.js";
  }
  if (errorMessage.includes("Vue") || errorMessage.includes("v-model") || errorMessage.includes("$")) {
    return "Vue.js";
  }
  if (errorMessage.includes("Express") || errorMessage.includes("middleware") || errorMessage.includes("req.")) {
    return "Express.js";
  }
  if (errorMessage.includes("Angular") || errorMessage.includes("@angular")) {
    return "Angular";
  }
  return null;
}

/**
 * Get enhanced prompt with framework-specific context
 */
export function getFrameworkEnhancedPrompt(
  framework: string,
  errorMessage: string
): string {
  const fixes = getFrameworkFixes(framework, errorMessage);
  
  if (fixes.length === 0) {
    return "";
  }

  let prompt = `\n\n🎯 **${framework}-Specific Context:**\n`;
  prompt += `Detected ${fixes.length} common ${framework} pattern(s) matching this error.\n\n`;

  fixes.forEach((fix, index) => {
    prompt += `**Pattern ${index + 1}: ${fix.title}**\n`;
    prompt += `Solution: ${fix.solution}\n`;
    prompt += `Why: ${fix.explanation}\n\n`;
  });

  prompt += `Please provide a ${framework}-optimized solution using best practices.\n`;

  return prompt;
}
