# FixFlow Setup Guide

## Quick Setup (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your Tambo API Key

1. Visit [tambo.ai](https://tambo.ai)
2. Sign up for a free account
3. Go to Dashboard → API Keys
4. Copy your API key

### 3. Configure Environment

```bash
# Create .env.local file
cp .env.local.example .env.local

# Edit .env.local and paste your API key
NEXT_PUBLIC_TAMBO_API_KEY=your_key_here
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Open Browser

Navigate to http://localhost:3000

## Customization

### Adding New Components

1. **Create the React component** in `src/components/debug-components/`
2. **Register it** in `src/lib/tambo-config.ts`:

```typescript
{
  name: "YourComponent",
  description: "When to use this component",
  component: YourComponent,
  propsSchema: z.object({
    // Define your props with Zod
  }),
}
```

3. **Update the system prompt** to tell the AI when to use it

### Modifying Themes

Edit `src/app/globals.css`:

```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
  /* ... */
}

[data-theme="dark"] {
  --primary: #your-dark-color;
  /* ... */
}
```

### Changing AI Model

Edit `src/app/layout.tsx`:

```typescript
<TamboProvider
  // ...
  config={{
    model: "claude-3-5-sonnet-20241022", // or "gpt-4-turbo"
    // ...
  }}
/>
```

## Deployment

### Vercel (Recommended)

```bash
vercel
```

### Other Platforms

```bash
npm run build
npm start
```

## Troubleshooting

### Port 3000 Already in Use

```bash
npm run dev -- -p 3001
```

### TypeScript Errors

```bash
npm run build
```

### Component Not Rendering

Check browser console for:

- Missing API key
- Invalid component props
- Network errors

## Development Tips

1. **Hot reload**: Changes auto-refresh the browser
2. **Component preview**: Test components in isolation
3. **Theme testing**: Use Chrome DevTools to toggle `data-theme`
4. **Debug Tambo**: Check Network tab for API calls

## Next Steps

- [ ] Add your Tambo API key
- [ ] Try example errors
- [ ] Customize themes
- [ ] Add new components
- [ ] Deploy to production

Need help? Check the [README](README.md) or join our [Discord](https://discord.gg/your-invite)
