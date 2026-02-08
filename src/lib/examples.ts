/**
 * Example errors for testing and demonstration
 */

export const EXAMPLE_ERRORS = [
  {
    id: "runtime-error-1",
    title: "TypeError: Cannot read property",
    language: "javascript",
    error: `TypeError: Cannot read property 'map' of undefined
    at processData (app.js:42:15)
    at handleClick (App.tsx:28:5)
    at onClick (Button.tsx:12:9)`,
    code: `function processData(data) {
  return data.map(item => item.value);
}`,
    fix: `function processData(data) {
  return data?.map(item => item.value) || [];
}`,
    explanation: "Added optional chaining and fallback to prevent undefined errors",
  },
  {
    id: "syntax-error-1",
    title: "SyntaxError: Unexpected token",
    language: "javascript",
    error: `SyntaxError: Unexpected token '<' in JSON at position 0
    at JSON.parse (<anonymous>)
    at fetchData (api.js:23:18)`,
    code: `async function fetchData() {
  const response = await fetch('/api/data');
  return JSON.parse(response);
}`,
    fix: `async function fetchData() {
  const response = await fetch('/api/data');
  const text = await response.text();
  return JSON.parse(text);
}`,
    explanation: "Response object needs to be converted to text before parsing",
  },
  {
    id: "dependency-conflict-1",
    title: "npm peer dependency conflict",
    language: "bash",
    error: `npm ERR! peer dep missing: react@^18.0.0, required by next@13.4.0
npm ERR! peer dep missing: react-dom@^18.0.0, required by next@13.4.0`,
    fix: `npm install react@^18.2.0 react-dom@^18.2.0`,
    explanation: "Next.js 13.4.0 requires React 18.x as a peer dependency",
  },
  {
    id: "null-reference-1",
    title: "ReferenceError: Variable not defined",
    language: "javascript",
    error: `ReferenceError: userData is not defined
    at renderProfile (Profile.tsx:15:20)
    at render (App.tsx:45:12)`,
    code: `function renderProfile() {
  return <div>{userData.name}</div>;
}`,
    fix: `function renderProfile() {
  const userData = useContext(UserContext);
  if (!userData) return <div>Loading...</div>;
  return <div>{userData.name}</div>;
}`,
    explanation: "Added context hook and null check for userData",
  },
  {
    id: "async-error-1",
    title: "Promise rejection unhandled",
    language: "javascript",
    error: `UnhandledPromiseRejectionWarning: Error: Network request failed
    at fetchUserData (api.js:34:11)`,
    code: `async function loadUser() {
  const user = await fetchUserData();
  setUser(user);
}`,
    fix: `async function loadUser() {
  try {
    const user = await fetchUserData();
    setUser(user);
  } catch (error) {
    console.error('Failed to load user:', error);
    setError(error.message);
  }
}`,
    explanation: "Added try-catch to handle async errors properly",
  },
];

/**
 * Example debugging stories for demonstration
 */
export const EXAMPLE_STORIES = [
  {
    id: "story-1",
    title: "The Missing Await Mystery",
    steps: [
      {
        title: "Where it started",
        description: "User clicked save button but nothing happened",
        componentType: "annotation" as const,
      },
      {
        title: "How it spread",
        description: "The async function chain broke silently",
        componentType: "diagram" as const,
      },
      {
        title: "What's affected",
        description: "All save operations in the application",
        componentType: "explanation" as const,
      },
      {
        title: "The fix",
        description: "Added proper async/await handling",
        componentType: "fix" as const,
      },
      {
        title: "Prevention",
        description: "Best practices for async operations",
        componentType: "explanation" as const,
      },
    ],
  },
];

/**
 * Common error patterns for AI detection
 */
export const ERROR_PATTERNS = {
  RUNTIME: [
    /TypeError/i,
    /ReferenceError/i,
    /RangeError/i,
    /Cannot read property/i,
    /undefined is not/i,
  ],
  SYNTAX: [
    /SyntaxError/i,
    /Unexpected token/i,
    /Unexpected end of/i,
    /Missing/i,
  ],
  DEPENDENCY: [
    /npm ERR!/i,
    /peer dep/i,
    /version conflict/i,
    /ERESOLVE/i,
    /yarn error/i,
  ],
  NETWORK: [
    /Network request failed/i,
    /ECONNREFUSED/i,
    /timeout/i,
    /404/i,
    /500/i,
  ],
  ASYNC: [
    /Promise/i,
    /async/i,
    /await/i,
    /UnhandledPromiseRejection/i,
  ],
};
