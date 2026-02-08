# Contributing to FixFlow

Thank you for your interest in contributing to FixFlow! This document provides guidelines for contributing.

## Code of Conduct

Be respectful, constructive, and collaborative.

## How to Contribute

### Reporting Bugs

1. Check existing issues first
2. Include:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment (OS, browser, Node version)

### Suggesting Features

1. Check existing feature requests
2. Describe the feature clearly
3. Explain why it's useful
4. Provide examples of usage

### Pull Requests

1. **Fork the repository**
2. **Create a branch**: `git checkout -b feature/your-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**: `git commit -m "Add: New component for..."`
6. **Push**: `git push origin feature/your-feature`
7. **Open a PR** with description

## Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/fixflow.git
cd fixflow

# Install dependencies
npm install

# Create .env.local with your Tambo API key
cp .env.local.example .env.local

# Start dev server
npm run dev
```

## Code Style

- Use TypeScript
- Follow existing patterns
- Use Prettier for formatting
- Add comments for complex logic
- Write meaningful commit messages

## Adding Components

1. Create component in `src/components/debug-components/`
2. Add Zod schema in `src/lib/tambo-config.ts`
3. Update system prompt
4. Add example usage to README
5. Test with various inputs

## Testing Checklist

- [ ] Component renders correctly
- [ ] Props validation works
- [ ] Dark and light themes work
- [ ] Responsive on mobile
- [ ] Animations are smooth
- [ ] No console errors
- [ ] TypeScript compiles

## Commit Message Format

```
Type: Brief description

Detailed explanation (if needed)

Examples:
- Add: New DebugStoryTimeline component
- Fix: Theme toggle not persisting
- Update: Improve error handling in StackTrace
- Docs: Add contribution guidelines
```

## Questions?

Open an issue or reach out on Discord!
