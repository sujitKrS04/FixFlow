# 🔧 FixFlow - AI Debugging Copilot

> **Stop reading error messages. Start seeing solutions.**

FixFlow transforms cryptic error messages into **visual debugging experiences**. Powered by Tambo's Generative UI, it dynamically renders interactive components tailored to your specific bug — from stack trace visualizers to dependency trees to complete debugging stories.

![FixFlow Banner](https://via.placeholder.com/1200x400/0a0e27/00ffff?text=FixFlow+AI+Debugging+Copilot)

## ✨ Features

### 🎨 **Visual Debugging Components**

- **Code Diff Viewer**: Side-by-side before/after code comparison
- **Stack Trace Viewer**: Interactive, collapsible stack frames
- **Execution Flow Diagrams**: Animated visualizations of code execution
- **Dependency Tree**: Visual package conflict resolution
- **Error Annotations**: Inline code annotations with severity markers

### 🎬 **Visual Debugging Stories** (Unique Feature!)

Multi-step interactive narratives that guide you through:

1. **Where it started** - Error origin identification
2. **How it spread** - Execution flow visualization
3. **What's affected** - Impact analysis
4. **The fix** - Complete solution with code
5. **Prevention** - Best practices and tips

### 🎓 **Learning Mode**

- Detailed explanations of why bugs happen
- Prevention tips and best practices
- Links to official documentation
- Related resources and examples

### ⚡ **One-Click Fixes**

- Instant code patch generation
- Copy to clipboard
- Download patch files
- Apply fixes with animations

### 🌓 **Dual Theming**

- **Cyberpunk Dark Mode**: Neon colors, animated backgrounds, matrix aesthetic
- **Arctic Light Mode**: Clean, minimal, professional design
- Smooth theme transitions with CSS variables

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18+ installed
- A Tambo API key ([Get one here](https://tambo.ai))

### **Installation**

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/fixflow.git
cd fixflow
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
# Copy the example env file
cp .env.local.example .env.local

# Edit .env.local and add your Tambo API key
NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_api_key_here
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### **Debugging with FixFlow**

1. **Paste your error** into the input field
2. **Watch the magic** as Tambo analyzes the error type
3. **Interact with components** - expand stack traces, view code diffs
4. **Apply fixes** with one click or download patches
5. **Learn** from the AI's explanations

### **Example Errors to Try**

**Runtime Error:**

```
TypeError: Cannot read property 'map' of undefined at line 42
```

**Syntax Error:**

```
SyntaxError: Unexpected token '<' in JSON at position 0
```

**Dependency Conflict:**

```
npm ERR! peer dep missing: react@^18.0.0, required by next@13.0.0
```

## 🏗️ Architecture

### **Tech Stack**

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Generative UI**: Tambo SDK (`@tambo-ai/react`)
- **Styling**: Tailwind CSS with CSS variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Code Highlighting**: React Syntax Highlighter
- **Flow Diagrams**: React Flow

### **Project Structure**

```
src/
├── app/
│   ├── layout.tsx          # Root layout with TamboProvider
│   ├── page.tsx            # Main chat interface
│   └── globals.css         # Global styles & themes
├── components/
│   ├── debug-components/   # Tambo-registered components
│   │   ├── CodeDiffViewer.tsx
│   │   ├── StackTraceViewer.tsx
│   │   ├── DependencyTree.tsx
│   │   ├── ExecutionFlowDiagram.tsx
│   │   ├── QuickFixButton.tsx
│   │   ├── LearningCard.tsx
│   │   ├── DebugStoryTimeline.tsx
│   │   └── ErrorAnnotation.tsx
│   └── ui/                 # Standard UI components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── ThemeToggle.tsx
├── contexts/
│   └── ThemeContext.tsx    # Theme management
└── lib/
    └── tambo-config.ts     # Component registration & AI prompt
```

## 🎨 Components

### **CodeDiffViewer**

Shows side-by-side code comparison with syntax highlighting.

```typescript
<CodeDiffViewer
  original="console.log(data.map(x => x))"
  fixed="console.log(data?.map(x => x) || [])"
  language="javascript"
  fileName="app.js"
  explanation="Added optional chaining and fallback"
/>
```

### **StackTraceViewer**

Interactive stack trace with collapsible frames.

```typescript
<StackTraceViewer
  frames={[...]}
  errorMessage="Cannot read property 'map' of undefined"
  errorType="TypeError"
/>
```

### **DebugStoryTimeline** (⭐ Signature Feature)

Multi-step visual debugging story.

```typescript
<DebugStoryTimeline
  steps={[
    {
      title: "Where it started",
      description: "Identifying the error origin",
      componentType: "annotation",
      componentData: {...}
    },
    // ... more steps
  ]}
/>
```

## 🧠 How Tambo Powers This

### **Intelligent Component Selection**

Tambo's AI analyzes error types and automatically chooses the right components:

```
User pastes: "ReferenceError: foo is not defined"

Tambo AI analyzes:
  - Error type: ReferenceError
  - Missing variable declaration
  - Runtime error requiring stack trace

Tambo renders:
  1. StackTraceViewer (shows where foo is referenced)
  2. CodeDiffViewer (shows adding const foo = ...)
  3. LearningCard (explains variable scope)
  4. QuickFixButton (one-click fix)
```

### **Progressive Streaming**

Components stream in as the AI generates props in real-time.

### **Multi-Component Orchestration**

Complex bugs get comprehensive visual treatment with the **DebugStoryTimeline**.

## 🎓 For Hackathon Judges

### **Why FixFlow Stands Out**

✅ **Potential Impact**: Saves developers hours daily by visualizing debugging
✅ **Creativity**: First debugging tool using generative UI instead of text
✅ **Technical Excellence**: 8 custom components with proper Zod schemas
✅ **Best Use of Tambo**: Perfect showcase of AI-driven component selection
✅ **Learning Value**: Teaches debugging through interactive experiences
✅ **UX/Design**: Dual themes with cyberpunk aesthetics and smooth animations

### **Unique Innovations**

1. **Visual Debugging Stories** - Multi-step narrative debugging (not seen elsewhere)
2. **Context-Aware Components** - AI chooses perfect component combinations
3. **Educational Mode** - Learn why bugs happen, not just how to fix them
4. **One-Click Fixes** - Instant patch application with animations
5. **Dual Theming** - Professional light mode + striking dark mode

## 🚀 Deployment

### **Deploy to Vercel** (Recommended)

```bash
npm install -g vercel
vercel
```

### **Build for Production**

```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Environment Variables

```env
# Required
NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_api_key

# Optional (if using models directly)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

## 🐛 Troubleshooting

### **"Module not found" errors**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Tambo components not rendering**

1. Check that `NEXT_PUBLIC_TAMBO_API_KEY` is set
2. Verify the key is valid at [tambo.ai/dashboard](https://tambo.ai/dashboard)
3. Check browser console for errors

### **Theme not switching**

Clear local storage and refresh:

```javascript
localStorage.clear();
location.reload();
```

## 📚 Resources

- **Tambo Docs**: [docs.tambo.ai](https://docs.tambo.ai)
- **Tambo GitHub**: [github.com/tambo-ai/tambo](https://github.com/tambo-ai/tambo)
- **Discord Community**: [discord.gg/dJNvPEHth6](https://discord.gg/dJNvPEHth6)
- **Component Examples**: [ui.tambo.co](https://ui.tambo.co)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- Built with ❤️ for the Tambo Hackathon
- Powered by [Tambo AI](https://tambo.ai)
- Inspired by the developer community's debugging struggles

---

<div align="center">

**Made with ❤️ by developers, for developers**

[Demo](https://fixflow.vercel.app) • [GitHub](https://github.com/yourusername/fixflow) • [Report Bug](https://github.com/yourusername/fixflow/issues)

</div>
