# 🔧 FixFlow - AI Debugging Copilot

> **Stop reading error messages. Start seeing solutions.**

FixFlow transforms cryptic error messages into **visual debugging experiences**. Powered by Tambo's Generative UI, it dynamically renders interactive components tailored to your specific bug — from stack trace visualizers to dependency trees to complete debugging stories.

## 🆕 New Features (Just Added!)

### 🧠 **Smart Context Auto-Detection**
Automatically detects your framework (React, Next.js, Vue, Angular), language (TypeScript/JavaScript), and dependencies to provide context-aware solutions.

### ⚡ **One-Click Fix Application**
Actually applies fixes to your files with automatic backups - no more copy-paste!

### 🌐 **Browser DevTools Integration**
Chrome/Firefox extension that automatically captures errors from any website and sends them to FixFlow.

### 📦 **Multi-Error Batch Analysis**
Analyze multiple errors simultaneously to find patterns, common root causes, and holistic solutions.

### 🎯 **Framework-Specific Smart Fixes**
Get intelligent, framework-optimized solutions for React, Next.js, Vue, TypeScript, Express, and more.

**📚 [Read Full Feature Documentation →](./NEW_FEATURES.md)**

---

![FixFlow Banner](https://via.placeholder.com/1200x400/0a0e27/00ffff?text=FixFlow+AI+Debugging+Copilot)

## ✨ Features

### 🎨 **Visual Debugging Components**

- **Code Diff Viewer**: Side-by-side before/after code comparison with syntax highlighting
- **Stack Trace Viewer**: Interactive, collapsible stack frames with error origin highlighting
- **Execution Flow Diagrams**: Animated visualizations of code execution paths
- **Dependency Tree**: Visual package conflict resolution with recommended fixes
- **Error Annotations**: Inline code annotations with severity markers
- **Quick Fix Button**: One-click code patch application
- **Learning Card**: Educational explanations with best practices
- **Debug Story Timeline**: Multi-step visual debugging narratives
- **Multi-Error Batch Analyzer**: Analyze multiple errors simultaneously

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

### 📥 **Multiple Input Modes**

- **Text Input**: Paste error messages directly
- **File Upload**: Upload log files or error reports
- **URL Import**: Paste GitHub issues or StackOverflow links
- **Batch Analysis**: Analyze multiple errors at once with priority management

### 🌓 **Dual Theming**

- **Cyberpunk Dark Mode**: Neon colors, animated backgrounds, matrix aesthetic
- **Arctic Light Mode**: Clean, minimal, professional design
- Smooth theme transitions with CSS variables
- Persistent theme preference across sessions

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18+ installed
- A Tambo API key ([Get one here](https://tambo.ai))

### **Installation**

1. **Clone the repository**

```bash
git clone https://github.com/sujitKrS04/FixFlow.git
cd FixFlow
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

6. **Install Browser Extension (Optional)**
   
   Load the browser extension to automatically capture errors from any website:
   
   ```bash
   # Chrome/Edge: Load unpacked extension from browser-extension/ folder
   # Firefox: Load temporary extension from browser-extension/manifest.json
   ```
   
   See [browser-extension/README.md](./browser-extension/README.md) for detailed instructions.

## 🎯 Usage

### **Debugging with FixFlow**

1. **Paste your error** into the input field (or use **Batch Analysis** for multiple errors)
2. **Watch the magic** as Tambo analyzes the error type and detects your framework
3. **Interact with components** - expand stack traces, view code diffs
4. **Apply fixes** with one click - fixes are written directly to your files with automatic backups
5. **Learn** from framework-specific explanations and best practices

### **New: Batch Analysis Mode**

Analyze multiple errors at once:

1. Click **"Batch Analysis"** button
2. Choose input method:
   - Individual errors with severity levels
   - Bulk import (paste multiple errors)
   - Upload error log files
3. AI finds patterns and common root causes
4. Get holistic solutions addressing all issues

### **New: Browser Extension Workflow**

For automatic error capture:

1. Install the FixFlow browser extension
2. Browse any website - errors are captured automatically
3. Click extension icon to see captured errors
4. Click "Send to FixFlow" to analyze all errors
5. Get instant debugging solutions

### **Example Errors to Try**

**Runtime Error:**

```
TypeError: Cannot read property 'map' of undefined at line 42
```

**React Hook Error:**

```
React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render
```

**Next.js Hydration Error:**

```
Error: Text content does not match server-rendered HTML
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
- **Language**: TypeScript 5
- **Generative UI**: Tambo SDK (`@tambo-ai/react` v0.75.0)
- **UI Library**: React 18.3
- **Styling**: Tailwind CSS with CSS variables
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **Code Highlighting**: React Syntax Highlighter
- **Flow Diagrams**: React Flow 11
- **Schema Validation**: Zod 3.22+

### **Project Structure**

```
src/
├── app/
│   ├── api/
│   │   └── apply-fix/
│   │       └── route.ts    # API for applying fixes to files
│   ├── layout.tsx          # Root layout with TamboProvider
│   ├── page.tsx            # Main chat interface + Batch Analysis
│   └── globals.css         # Global styles & themes
├── components/
│   ├── debug-components/   # Tambo-registered components
│   │   ├── CodeDiffViewer.tsx
│   │   ├── StackTraceViewer.tsx
│   │   ├── DependencyTree.tsx
│   │   ├── ExecutionFlowDiagram.tsx
│   │   ├── QuickFixButton.tsx      # Now writes to files!
│   │   ├── LearningCard.tsx
│   │   ├── DebugStoryTimeline.tsx
│   │   ├── ErrorAnnotation.tsx
│   │   └── MultiErrorBatchAnalyzer.tsx  # NEW: Batch analysis
│   └── ui/                 # Standard UI components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── ThemeToggle.tsx
├── contexts/
│   └── ThemeContext.tsx    # Theme management
└── lib/
    ├── tambo-config.ts     # Component registration & AI prompt
    ├── context-detector.ts # NEW: Smart context detection
    └── framework-fixes.ts  # NEW: Framework-specific patterns
browser-extension/          # NEW: Chrome/Firefox extension
├── manifest.json
├── content.js             # Error capture
├── background.js          # Error storage
├── popup.html/js          # Extension UI
└── devtools.html          # DevTools panel
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

✅ **Potential Impact**: Saves developers hours daily by visualizing debugging + framework-specific solutions
✅ **Creativity**: First debugging tool using generative UI + automatic error capture + real file fixes
✅ **Technical Excellence**: 8 custom components + browser extension + smart context detection + framework patterns
✅ **Best Use of Tambo**: Perfect showcase of AI-driven component selection with enhanced intelligence
✅ **Learning Value**: Teaches debugging through interactive experiences + framework best practices
✅ **UX/Design**: Dual themes with cyberpunk aesthetics + one-click workflows

### **Unique Innovations**

1. **Visual Debugging Stories** - Multi-step narrative debugging (not seen elsewhere)
2. **Smart Context Auto-Detection** - Automatic framework/dependency detection for relevant solutions
3. **Browser DevTools Integration** - Automatic error capture from any website
4. **Multi-Error Batch Analysis** - Analyze patterns across multiple related errors
5. **Framework-Specific Smart Fixes** - Intelligent solutions for React, Next.js, Vue, TypeScript, Express
6. **Real One-Click Fixes** - Actually writes to files with automatic backups (not just copy-paste)
7. **Educational Mode** - Learn why bugs happen, not just how to fix them
8. **Dual Theming** - Professional light mode + striking dark mode

### **Technical Achievements**

- ✅ 14 new files implementing 5 major features
- ✅ Complete browser extension (Chrome + Firefox compatible)
- ✅ Secure file operations with validation and backups
- ✅ Framework pattern database with automatic detection
- ✅ Context-aware AI with framework intelligence
- ✅ Type-safe TypeScript throughout
- ✅ Production-ready with comprehensive error handling

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

### **File fixes not applying**

1. Check that the API route `/api/apply-fix` is accessible
2. Verify file paths are within the project directory
3. Ensure you have write permissions for the target files
4. Check console for detailed error messages

### **Browser extension not capturing errors**

1. Refresh the page after installing the extension
2. Verify the extension is enabled in browser settings
3. Check that the extension has permissions for the current page
4. Open browser console to see if errors are being logged

### **Context detection not working**

```typescript
// Manually trigger context refresh
import { ContextDetector } from '@/lib/context-detector';
const detector = ContextDetector.getInstance();
await detector.refreshContext();
```

### **Batch analysis not showing**

1. Ensure you've imported the component in page.tsx
2. Check for console errors
3. Verify the modal state is being managed correctly

## 📚 Resources

- **New Features Guide**: [NEW_FEATURES.md](./NEW_FEATURES.md) - Comprehensive documentation
- **Implementation Summary**: [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Quick overview
- **Browser Extension**: [browser-extension/README.md](./browser-extension/README.md) - Installation guide
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

[Demo](https://fixflow.vercel.app) • [GitHub](https://github.com/sujitKrS04/FixFlow) • [Report Bug](https://github.com/sujitKrS04/FixFlow/issues)

</div>
