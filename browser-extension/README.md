# FixFlow Browser Extension

This browser extension integrates FixFlow with your browser's DevTools to automatically capture errors from any website.

## Features

- ✅ Automatic error capture (console.error, runtime errors, promise rejections, fetch failures)
- ✅ DevTools panel integration
- ✅ One-click send to FixFlow
- ✅ Error history (last 50 errors)
- ✅ Badge notification with error count

## Installation

### Chrome/Edge

1. Open `chrome://extensions/` (or `edge://extensions/`)
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `browser-extension` folder from FixFlow project
5. Pin the extension for easy access

### Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Navigate to `browser-extension` folder
4. Select `manifest.json`

## Usage

### Automatic Capture

Once installed, the extension automatically captures:

- Console errors (`console.error`)
- Runtime errors (uncaught exceptions)
- Promise rejections
- Failed HTTP requests

### Viewing Errors

1. Click the FixFlow extension icon in your browser toolbar
2. View the list of captured errors
3. Click "Send to FixFlow" to open FixFlow with all errors
4. Click "Clear All" to reset the error list

### DevTools Panel

1. Open browser DevTools (F12)
2. Navigate to the "FixFlow" tab
3. Errors are automatically logged here as well

## Configuration

You can customize the FixFlow URL:

1. Right-click the extension icon
2. Select "Options"
3. Enter your custom FixFlow URL (default: `http://localhost:3000`)

## Security & Privacy

- ✅ Runs only on pages you visit
- ✅ No data sent to external servers
- ✅ Errors stay local until you explicitly send them
- ✅ Open source - inspect the code yourself

## Troubleshooting

### Extension not capturing errors

Make sure the extension is enabled and refresh the page after installation.

### "Send to FixFlow" not working

Check that FixFlow is running at the configured URL (default: `http://localhost:3000`).

### Permission errors

The extension needs permission to access the current tab to capture errors. Grant permissions when prompted.

## Development

To modify the extension:

1. Edit files in `browser-extension/` folder
2. Reload the extension:
   - Chrome: Go to `chrome://extensions/` and click reload icon
   - Firefox: Click "Reload" in `about:debugging`
3. Refresh the page you're testing on

## License

MIT - See LICENSE file in the FixFlow project root
