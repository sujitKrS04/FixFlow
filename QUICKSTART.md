# 🚀 Quick Start Instructions

Welcome to **FixFlow**! Get up and running in 5 minutes.

## Step-by-Step Setup

### 1️⃣ Install Dependencies (1 minute)

Open your terminal in the project folder and run:

```bash
npm install
```

This will install all required packages including:

- Next.js
- React
- Tambo SDK
- Tailwind CSS
- Framer Motion
- And more...

### 2️⃣ Get Your Tambo API Key (2 minutes)

1. Go to **[tambo.ai](https://tambo.ai)**
2. Click **"Sign Up"** (it's free!)
3. Navigate to **Dashboard → API Keys**
4. Click **"Create New Key"**
5. Copy your API key

### 3️⃣ Configure Environment (30 seconds)

```bash
# Copy the example environment file
cp .env.local.example .env.local
```

Open `.env.local` in your editor and paste your API key:

```env
NEXT_PUBLIC_TAMBO_API_KEY=your_api_key_here
```

### 4️⃣ Start the App (30 seconds)

```bash
npm run dev
```

You should see:

```
✓ Ready in 2.5s
○ Local: http://localhost:3000
```

### 5️⃣ Open Your Browser (30 seconds)

Navigate to: **http://localhost:3000**

You should see the FixFlow welcome screen! 🎉

---

## First Steps

### Try an Example Error

Click one of the example error cards on the welcome screen:

1. **TypeError Example** - See CodeDiffViewer + StackTraceViewer
2. **Syntax Error** - See ErrorAnnotation + LearningCard
3. **Dependency Conflict** - See DependencyTree + QuickFixButton

### Paste Your Own Error

1. Copy any error message from your terminal or console
2. Paste it into the input field at the bottom
3. Press **Enter** or click **Send**
4. Watch Tambo analyze and render components!

### Toggle Themes

Click the theme toggle button in the top-right corner to switch between:

- 🌙 **Dark Mode** (Cyberpunk with neon colors)
- ☀️ **Light Mode** (Clean and professional)

---

## Common Issues

### "Module not found" errors

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 is already in use

```bash
npm run dev -- -p 3001
```

### Tambo API key not working

1. Check that you copied the entire key
2. Verify no extra spaces in `.env.local`
3. Restart the dev server: `Ctrl+C` then `npm run dev`
4. Clear browser cache and refresh

### Components not rendering

1. Open browser console (F12)
2. Check for error messages
3. Verify API key is set correctly
4. Check network tab for failed requests

---

## What's Next?

✅ Try different types of errors  
✅ Explore the Visual Debugging Story feature  
✅ Toggle between themes  
✅ Check out the interactive components  
✅ Read [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) for architecture details  
✅ Customize themes in `src/app/globals.css`  
✅ Add new components (see [CONTRIBUTING.md](CONTRIBUTING.md))

---

## Need Help?

- 📖 Read the full [README.md](README.md)
- 🔧 Check [SETUP.md](SETUP.md) for detailed configuration
- 💬 Join our Discord community
- 🐛 Report issues on GitHub

---

**Enjoy debugging with FixFlow!** 🚀✨
