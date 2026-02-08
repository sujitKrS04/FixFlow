# 🚀 Quick Start Guide - New Features

Welcome to FixFlow's latest features! This guide will get you up and running in 5 minutes.

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies (30 seconds)

```bash
npm install
```

### Step 2: Environment Setup (30 seconds)

```bash
# Copy example env file
cp .env.local.example .env.local

# Add your Tambo API key to .env.local
NEXT_PUBLIC_TAMBO_API_KEY=your_key_here
```

### Step 3: Start Development Server (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Step 4: Try the Features! (3 minutes)

## 🎯 Feature Quick Tests

### Test 1: Smart Context Detection (30 seconds)

Context is detected automatically! Just use FixFlow normally.

To verify it's working:
```typescript
// Open browser console
// The AI will mention your framework in responses
```

Example: Paste this React error:
```
TypeError: Cannot read property 'map' of undefined in MyComponent.tsx
```

Notice how the AI provides React-specific solutions! 🎯

---

### Test 2: One-Click Fix Application (1 minute)

1. Paste any error
2. Wait for AI response
3. Find the **"Apply Fix"** button
4. Click it!
5. Check your file - it's been fixed! ✨
6. Find the backup: `yourfile.backup.timestamp`

**Safety**: Always creates backups before changing files!

---

### Test 3: Multi-Error Batch Analysis (1 minute)

1. Click **"Batch Analysis"** button (top right)
2. Try **Bulk Import**:
   ```
   TypeError: Cannot read property 'map' of undefined
   Warning: Each child should have a unique key prop
   Error: Hydration failed because server HTML didn't match client
   ```
3. Click **"Analyze All"**
4. Watch AI find patterns across all errors! 🔍

---

### Test 4: Browser Extension (30 seconds setup + ongoing)

#### Quick Install:

**Chrome/Edge:**
1. Go to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select `browser-extension` folder
5. Done! 🎉

**Firefox:**
1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `browser-extension/manifest.json`
4. Done! 🎉

#### Try it out:
1. Browse any website
2. Open browser console: `console.error("Test error")`
3. Click FixFlow extension icon
4. See your error captured!
5. Click "Send to FixFlow"
6. Instant debugging! ⚡

---

### Test 5: Framework-Specific Fixes (built-in)

This works automatically! Just paste framework-specific errors:

**React Hook Error:**
```
React Hook "useEffect" is called conditionally
```
→ Get React-specific solution with hooks best practices

**Next.js Hydration:**
```
Error: Text content does not match server-rendered HTML
```
→ Get Next.js server/client rendering explanation

**TypeScript Error:**
```
Property 'name' does not exist on type 'User'
```
→ Get TypeScript interface solution

---

## 🎓 What Each Feature Does

### 🧠 Smart Context Auto-Detection
**What**: Automatically detects your framework, language, dependencies
**Why**: Gets you framework-specific solutions
**When**: Always running in background

### ⚡ One-Click Fix Application
**What**: Actually writes fixes to your files
**Why**: No more copy-paste! Instant fixes!
**When**: Click "Apply Fix" button
**Safety**: Creates backups first

### 🌐 Browser DevTools Integration
**What**: Chrome/Firefox extension captures errors automatically
**Why**: Debugging without leaving your browser
**When**: Install once, use forever

### 📦 Multi-Error Batch Analysis
**What**: Analyze multiple errors at once
**Why**: Find patterns, root causes, holistic solutions
**When**: You have multiple related errors

### 🎯 Framework-Specific Smart Fixes
**What**: Intelligent solutions tailored to your framework
**Why**: Best practices for React, Next.js, Vue, TypeScript, Express
**When**: Automatic - AI detects framework from error

---

## 📊 Quick Comparison

| Task | Before | With New Features |
|------|--------|------------------|
| Single Error | Paste → Wait → Copy | Paste → Wait → **Click Apply** ✨ |
| Multiple Errors | Paste one by one | **Batch Analysis** - all at once |
| Browser Errors | Copy from console | **Auto-captured** by extension |
| Framework Solution | Generic advice | **React/Next/Vue-specific** |
| File Changes | Manual copy-paste | **One-click with backup** |

---

## 🎯 Common Workflows

### Workflow 1: Quick Bug Fix
```
1. Paste error → 2. AI analyzes → 3. Click "Apply Fix" → Done! ⚡
```

### Workflow 2: Multiple Related Errors
```
1. Click "Batch Analysis" 
2. Paste all errors 
3. AI finds patterns 
4. Apply holistic solution → Done! 📦
```

### Workflow 3: Browser Debugging
```
1. Browse website 
2. Error happens (auto-captured) 
3. Click extension 
4. "Send to FixFlow" 
5. Get solution → Done! 🌐
```

### Workflow 4: Learning Mode
```
1. Paste framework-specific error
2. Get framework-tailored explanation
3. Learn best practices
4. Apply fix
5. Become better developer! 🎓
```

---

## 🔥 Pro Tips

### Tip 1: Browser Extension + Batch Analysis
Capture multiple errors with extension, send all to FixFlow batch analyzer!

### Tip 2: Always Check Backups
Before applying fixes, know where backups are: `filename.backup.timestamp`

### Tip 3: Framework Detection
Include framework info in error for better detection:
```
// Good
"React Hook error in MyComponent.tsx"

// Better (if detection fails)
"React: Cannot call hooks conditionally in MyComponent.tsx"
```

### Tip 4: Batch Analysis File Upload
Have an error log file? Upload it directly to batch analyzer!

### Tip 5: Context Refresh
If AI responses seem generic, refresh context:
```typescript
import { ContextDetector } from '@/lib/context-detector';
const detector = ContextDetector.getInstance();
await detector.refreshContext();
```

---

## 🎬 Video Walkthroughs (Recommended)

### 1. One-Click Fixes (1 min)
1. Paste error: "TypeError: Cannot read property 'map'"
2. See CodeDiffViewer with fix
3. Click "Apply Fix"
4. File updated + backup created ✨

### 2. Batch Analysis (1 min)
1. Click "Batch Analysis"
2. Paste 3 errors
3. AI shows patterns
4. Get comprehensive solution 📦

### 3. Browser Extension (1 min)
1. Install extension
2. Browse website
3. Error auto-captured
4. Click "Send to FixFlow"
5. Instant debugging 🌐

---

## ❓ Having Issues?

### Extension not working?
- Refresh page after installing
- Check extension permissions
- Enable "Developer mode"

### Fixes not applying?
- Check file permissions
- Verify file path
- See console for errors

### Context not detecting?
- Check package.json exists
- Verify dependencies listed
- Manually refresh context

### Need help?
1. Check [NEW_FEATURES.md](./NEW_FEATURES.md) for full docs
2. See troubleshooting in [README.md](./README.md)
3. Check browser/terminal console

---

## 🎉 You're Ready!

All 5 features are now at your fingertips:
- ✅ Smart Context Detection
- ✅ One-Click Fixes
- ✅ Browser Extension
- ✅ Batch Analysis
- ✅ Framework-Specific Solutions

**Start debugging smarter, not harder!** 🚀

---

## 📚 Next Steps

1. ⭐ Star the repo if you like it!
2. 📖 Read [NEW_FEATURES.md](./NEW_FEATURES.md) for deep dive
3. 🔧 Try real bugs from your projects
4. 🎨 Customize themes (Light/Dark mode)
5. 🤝 Share feedback and contribute!

Happy debugging! 🐛 → ✨
