# Starting Charger IDE

## Quick Start

Run in the project directory:
```bash
npm run dev
```

This will:
1. Start the Vite dev server
2. Launch Electron with the app
3. Hot reload on code changes

## Expected Result

You should see a window with:
- **Dark theme** (background #1e1e1e)
- **Left sidebar** - Empty Explorer panel
- **Center** - Tab bar with welcome message
- **Bottom** - Collapsible Output panel

## Current Status

✅ Basic layout working
✅ Dark theme
✅ Tab system UI
⏳ File operations pending
⏳ Monaco Editor pending

## Troubleshooting

If the app doesn't start:
1. Check that Node.js is installed (`node --version`)
2. Check that dependencies are installed (`npm install`)
3. Look for error messages in the terminal

## Next Steps

Once the app is running, we'll add:
1. File open/save functionality
2. File explorer tree
3. Monaco editor integration
