# 🎯 FixFlow - Complete Project Overview

## 📋 Table of Contents

1. [Project Summary](#project-summary)
2. [Architecture Overview](#architecture-overview)
3. [Component Details](#component-details)
4. [Tambo Integration](#tambo-integration)
5. [Getting Started](#getting-started)
6. [Development Guide](#development-guide)
7. [Deployment](#deployment)
8. [Hackathon Highlights](#hackathon-highlights)

---

## Project Summary

**FixFlow** is an AI-powered debugging copilot that transforms traditional text-based error messages into **interactive visual debugging experiences**. Built with Tambo's Generative UI SDK, it dynamically renders context-aware React components based on the type of bug, making debugging faster, more intuitive, and educational.

### Key Innovation

Instead of responding with text explanations, FixFlow's AI agent analyzes errors and renders the perfect combination of visual components — from interactive stack traces to execution flow diagrams to complete debugging stories.

---

## Architecture Overview

### Tech Stack

```
Frontend Framework:  Next.js 15 + React 18 + TypeScript
Generative UI:       Tambo SDK (@tambo-ai/react)
Styling:             Tailwind CSS + CSS Variables
Animations:          Framer Motion
Code Highlighting:   React Syntax Highlighter
Flow Diagrams:       React Flow
Schema Validation:   Zod v4
Icons:               Lucide React
```

### Folder Structure

```
FixFlow/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with TamboProvider
│   │   ├── page.tsx            # Main chat interface
│   │   └── globals.css         # Global styles + theme definitions
│   ├── components/
│   │   ├── debug-components/   # 8 Tambo-registered components
│   │   │   ├── CodeDiffViewer.tsx
│   │   │   ├── StackTraceViewer.tsx
│   │   │   ├── DependencyTree.tsx
│   │   │   ├── ExecutionFlowDiagram.tsx
│   │   │   ├── QuickFixButton.tsx
│   │   │   ├── LearningCard.tsx
│   │   │   ├── DebugStoryTimeline.tsx
│   │   │   └── ErrorAnnotation.tsx
│   │   └── ui/                 # Standard UI components
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── ThemeToggle.tsx
│   ├── contexts/
│   │   └── ThemeContext.tsx    # Theme state management
│   ├── lib/
│   │   ├── tambo-config.ts     # Component registration + AI prompt
│   │   ├── utils.ts            # Utility functions
│   │   └── examples.ts         # Example errors for testing
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── public/                     # Static assets
├── .env.local.example          # Environment variable template
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Component Details

### 1. **CodeDiffViewer**

**Purpose**: Side-by-side code comparison  
**When to Use**: Showing fixes, refactors, or changes  
**Features**:

- Split view and unified view
- Syntax highlighting via React Syntax Highlighter
- Color-coded before/after sections
- Explanation text support

**Example Usage by AI**:

```typescript
// User: "How do I fix this undefined error?"
AI renders:
<CodeDiffViewer
  original="console.log(data.map(x => x))"
  fixed="console.log(data?.map(x => x) || [])"
  language="javascript"
  fileName="app.js"
  explanation="Added optional chaining and fallback array"
/>
```

### 2. **StackTraceViewer**

**Purpose**: Interactive stack trace explorer  
**When to Use**: Runtime errors, exceptions, crashes  
**Features**:

- Collapsible stack frames
- Error origin highlighting
- Code snippets per frame
- File path and line numbers

**AI Decision Logic**:

```
Input: "TypeError: Cannot read property 'map'"
→ AI detects runtime error
→ Renders StackTraceViewer with frames
→ Highlights frame where .map() was called
```

### 3. **ExecutionFlowDiagram**

**Purpose**: Visualize code execution path  
**When to Use**: Complex logic, async flows, crashes  
**Features**:

- Animated node-edge graph (React Flow)
- Different node types (start, function, condition, error, end)
- Error node highlighting
- Interactive zooming/panning

### 4. **DependencyTree**

**Purpose**: Package dependency conflicts  
**When to Use**: npm/yarn errors, version mismatches  
**Features**:

- Visual tree of conflicting packages
- Version requirement display
- Recommended fix commands

### 5. **QuickFixButton**

**Purpose**: One-click fix application  
**When to Use**: When complete fix code is available  
**Features**:

- Apply, copy, or download patch
- Loading and success animations
- Confirmation dialogs

### 6. **LearningCard**

**Purpose**: Educational explanations  
**When to Use**: Learning mode, common bugs, "why" questions  
**Features**:

- Conceptual explanations
- Prevention tips checklist
- Related documentation links

### 7. **ErrorAnnotation**

**Purpose**: Inline code annotations  
**When to Use**: Syntax errors, linting issues  
**Features**:

- Line-by-line code display
- Severity markers (error/warning/info)
- Inline messages

### 8. **DebugStoryTimeline** ⭐ (Signature Feature)

**Purpose**: Multi-step visual debugging narrative  
**When to Use**: Complex bugs, first-time users, educational mode  
**Features**:

- 5-step guided debugging journey
- Renders other components within steps
- Progress tracking
- Step navigation with animations

**Story Structure**:

1. **Where it started** → Origin identification
2. **How it spread** → Execution flow
3. **What's affected** → Impact analysis
4. **The fix** → Complete solution
5. **Prevention** → Best practices

---

## Tambo Integration

### How Tambo Powers FixFlow

#### 1. **Component Registration**

All components are registered in `src/lib/tambo-config.ts` with:

- **Name**: Component identifier
- **Description**: When the AI should use it
- **Component**: React component reference
- **Props Schema**: Zod validation schema

```typescript
export const debugComponents: TamboComponent[] = [
  {
    name: "CodeDiffViewer",
    description: "Shows side-by-side code comparison...",
    component: CodeDiffViewer,
    propsSchema: z.object({
      original: z.string(),
      fixed: z.string(),
      language: z.string(),
      fileName: z.string(),
      explanation: z.string().optional(),
    }),
  },
  // ... 7 more components
];
```

#### 2. **AI System Prompt**

The `DEBUG_SYSTEM_PROMPT` in `tambo-config.ts` instructs the AI:

- Error type → Component mapping rules
- When to combine multiple components
- Usage guidelines for each component
- Response tone and style

#### 3. **TamboProvider Setup**

In `src/app/layout.tsx`:

```typescript
<TamboProvider
  apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY}
  components={debugComponents}
  tools={debugTools}
  config={{
    model: "gpt-4-turbo",
    systemPrompt: DEBUG_SYSTEM_PROMPT,
  }}
>
  {children}
</TamboProvider>
```

#### 4. **Chat Interface**

In `src/app/page.tsx`:

```typescript
const { thread } = useTamboThread();
const { value, setValue, submit, isPending } = useTamboThreadInput();

// Messages contain both text and rendered components
thread.messages.map(message => (
  <div>
    {message.content} {/* Text */}
    {message.renderedComponent} {/* Tambo component */}
  </div>
))
```

### AI Decision Flow

```
1. User Input: Error message or code
       ↓
2. Tambo AI analyzes error type
       ↓
3. AI selects appropriate component(s)
       ↓
4. AI generates component props
       ↓
5. Tambo validates props with Zod schema
       ↓
6. Component streams into UI progressively
       ↓
7. User interacts with component
       ↓
8. AI responds with additional components if needed
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Tambo API key ([Get one here](https://tambo.ai))

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd FixFlow

# Install dependencies
npm install

# Set up environment
cp .env.local.example .env.local
# Edit .env.local and add: NEXT_PUBLIC_TAMBO_API_KEY=your_key

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### First Run

1. You'll see the welcome screen with example errors
2. Click an example or paste your own error
3. Watch Tambo render components dynamically
4. Interact with components (expand stack traces, apply fixes)
5. Toggle between dark and light themes

---

## Development Guide

### Adding a New Component

**Step 1**: Create the React component

```typescript
// src/components/debug-components/MyComponent.tsx
"use client";

interface MyComponentProps {
  data: string;
}

export function MyComponent({ data }: MyComponentProps) {
  return <div>{data}</div>;
}
```

**Step 2**: Register with Tambo

```typescript
// src/lib/tambo-config.ts
import { MyComponent } from "@/components/debug-components/MyComponent";

export const debugComponents: TamboComponent[] = [
  // ... existing components
  {
    name: "MyComponent",
    description: "Use this when...",
    component: MyComponent,
    propsSchema: z.object({
      data: z.string().describe("Description for AI"),
    }),
  },
];
```

**Step 3**: Update system prompt

```typescript
// In DEBUG_SYSTEM_PROMPT
MY_ERROR_TYPE:
- Use: MyComponent (when this condition...)
```

### Modifying Themes

Edit `src/app/globals.css`:

```css
:root {
  --primary: #2563eb; /* Change colors */
}

[data-theme="dark"] {
  --primary: #00ffff;
}
```

### Testing Components

Create test cases in `src/lib/examples.ts`:

```typescript
export const TEST_CASES = [
  {
    input: "Your error message",
    expectedComponent: "CodeDiffViewer",
    expectedProps: {
      /* ... */
    },
  },
];
```

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard:
# NEXT_PUBLIC_TAMBO_API_KEY=your_key
```

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Required in production:

```env
NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_api_key
```

---

## Hackathon Highlights

### Why FixFlow Wins

#### 1. **Potential Impact** 🌟

- Saves developers **hours daily** by visualizing debugging
- Makes debugging accessible to beginners
- Transforms error messages into learning opportunities

#### 2. **Creativity & Originality** 🎨

- **First debugging tool** using generative UI
- **Visual Debugging Stories** - completely unique feature
- AI chooses perfect component combinations dynamically

#### 3. **Technical Excellence** 💻

- 8 custom Tambo components with proper Zod schemas
- Clean architecture with TypeScript
- Progressive component streaming
- Responsive design with dual theming

#### 4. **Best Use of Tambo** ⚡

- Perfect showcase of AI-driven component selection
- Demonstrates streaming, schemas, and context helpers
- Shows how Tambo eliminates conditional UI logic

#### 5. **Learning Value** 🎓

- Educational mode with prevention tips
- Visual debugging stories teach concepts deeply
- Related documentation and resources

#### 6. **UX/Design** 🎭

- Cyberpunk dark mode with neon aesthetics
- Clean light mode for professionals
- Smooth Framer Motion animations
- Mobile-responsive

### Demo Script

**3-Minute Video Structure**:

1. **Hook** (0:00-0:20): Show a developer stuck on cryptic error
2. **Intro** (0:20-0:40): "Introducing FixFlow - debugging that shows, not tells"
3. **Demo 1** (0:40-1:20): Syntax error → ErrorAnnotation + CodeDiffViewer
4. **Demo 2** (1:20-2:00): Dependency conflict → DependencyTree + QuickFix
5. **Demo 3** (2:00-2:40): Complex bug → DebugStoryTimeline (show all 5 steps)
6. **Theme Toggle** (2:40-2:50): Quick theme switch
7. **Closing** (2:50-3:00): GitHub link, call to action

### Key Metrics to Highlight

- **8 custom components** registered with Tambo
- **Dual theming** with smooth transitions
- **Progressive streaming** of component props
- **100% TypeScript** with Zod validation
- **Mobile-responsive** design
- **Zero text-only responses** - all visual

---

## Next Steps

### Immediate Priorities

- [ ] Get Tambo API key
- [ ] Install dependencies
- [ ] Run development server
- [ ] Test with example errors
- [ ] Customize themes
- [ ] Record demo video

### Future Enhancements

- [ ] GitHub integration for PR creation
- [ ] VS Code extension
- [ ] Multi-language support (Python, Java, Go)
- [ ] Voice input for errors
- [ ] Team collaboration features
- [ ] Analytics dashboard

---

## Support & Resources

- **Documentation**: See [README.md](README.md)
- **Setup Guide**: See [SETUP.md](SETUP.md)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)
- **Tambo Docs**: [docs.tambo.ai](https://docs.tambo.ai)
- **Discord**: Join the community for help

---

## License

MIT License - see [LICENSE](LICENSE) for details

---

**Built with ❤️ for the Tambo Hackathon**  
**Powered by Tambo AI • Made by developers, for developers**
