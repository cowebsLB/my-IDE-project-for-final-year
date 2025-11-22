<!-- 5ca0496b-60d6-47e4-9c83-c94cf51f59cf c40d3101-dc33-4905-9908-4d067382e0c0 -->
# Custom IDE Development Plan

## Technology Stack

- **Framework**: Electron (desktop app framework)
- **Language**: TypeScript (type-safe JavaScript)
- **UI Library**: React (component-based UI)
- **Editor Core**: Monaco Editor (VS Code's editor)
- **Styling**: **Tailwind CSS** (lightweight, easy to customize)
- **Build Tool**: Vite (fast builds)
- **Package Manager**: npm or yarn

## Project Name & Branding

- **Project Name**: **Charger** ⚡
- **Tagline**: Power up your coding experience
- **Naming consideration**: Short, memorable, implies speed and power

## Prerequisites & System Requirements

### Required Software:
- **Node.js** (v18 or higher)
- **npm** or **yarn** (package manager)
- **Git** (for version control)
- **VS Code or Cursor** (your own IDE to build your IDE!)
- **Python** (3.8+) - for testing Python support
- **Windows 10/11** - primary target platform

### Optional but Recommended:
- **GitHub account** - for version control
- **Figma or Excalidraw** - for UI mockups (optional)

### Hardware Requirements (Target for Your IDE):
- **Minimum**: 4GB RAM, dual-core CPU
- **Recommended**: 8GB+ RAM, quad-core CPU
- **Storage**: At least 1GB free space

## Phase 1: Project Setup & Rock-Solid Basic Editor (Weeks 1-8)

**FOCUS: Stability first. Make the basic editor rock solid. Multi-language highlighting is sexy, but don't let it break your build. Test continuously throughout development, not just at the end.**

### 1.1 Environment Setup

- Install Node.js, npm, and Electron
- Create Electron + React + TypeScript project structure with Vite
- Set up build configuration (electron-builder for packaging)
- Configure hot reload for development
- **Test: Verify Electron app launches successfully on Windows**

### 1.2 Basic Window & Layout

- Create main Electron window with menu bar
- Design 3-panel layout: file explorer (left), editor (center), output panel (bottom)
- Implement resizable panels with splitters
- Add title bar with window controls
- **Test: Window resizing, minimizing, maximizing, and persistence of panel sizes**

### 1.3 Integrate Monaco Editor

- Install and configure Monaco Editor
- Create editor component with basic text editing
- Implement tab system for multiple open files
- Add file type detection
- **Test: Open multiple tabs, switch between them, close tabs**
- **Test: Large files (1000+ lines) for performance**

### 1.4 File System Operations (Critical - Make This Bulletproof)

- File explorer tree view (show folders/files)
- Open, save, save-as functionality
- Create new file/folder
- Delete, rename, move files
- Recent files/projects menu
- **Test: Nested folders, special characters in filenames**
- **Test: File watcher (auto-reload when files change externally)**
- **Test: Unsaved changes warning before closing tabs**

## Phase 2: Multi-Language Syntax & Stability (Weeks 9-12)

**FOCUS: Core languages first. Don't break the build with too many features at once.**

### 2.1 Core Syntax Highlighting (Priority Languages)

- Configure Monaco for essential languages:
- **Python** (primary - test thoroughly)
- **JavaScript/TypeScript** (primary - test thoroughly)
- **HTML, CSS, JSON** (common web files)
- **Markdown** (for documentation)
- Auto-detect language from file extension
- Manual language selection dropdown in editor
- **Test: Each language independently before moving to next**
- **Test: Mixed file types in same project**

### 2.2 Additional Languages (Add Later, After Core is Stable)

- Java, C/C++ (add only after LSP integration works)
- PHP, Ruby, Go, Rust (bonus - only if time permits)

### 2.3 Basic Code Intelligence

- Bracket matching and auto-closing
- Auto-indentation per language
- Code folding
- Comment toggling (Ctrl+/)
- Find and replace (Ctrl+F, Ctrl+H)
- **Test: All keyboard shortcuts work correctly**

### 2.4 Editor Enhancements

- Line numbers with current line highlight
- Minimap (code overview) on the right
- Go to line functionality (Ctrl+G)
- Breadcrumbs for file path

## Phase 3: Advanced Features - Python + JS/TS First (Weeks 13-16)

**FOCUS: Start with Python + JavaScript/TypeScript ONLY. Master LSP integration before adding more languages. Keep it simple.**

### 3.1 Autocomplete & IntelliSense (Python + TypeScript Only)

**IMPORTANT: Don't try to add all languages at once. Perfect Python first, then TypeScript.**

- Integrate Language Server Protocol (LSP) client library
- **Phase 3a: Python first (test thoroughly before moving on)**
  - Install and configure Pyright LSP server
  - Show suggestions dropdown (trigger on typing)
  - Parameter hints and documentation tooltips
  - Error/warning squiggles from diagnostics
  - **Test: Create a sample Python project, verify autocomplete works**
  - **Test: Import statements, function signatures, type hints**
- **Phase 3b: TypeScript (only after Python is working well)**
  - Install TypeScript Language Server
  - Test autocomplete and type hints
  - **Test: Sample Node.js project with imports**
- **Skip all other languages (Java, C++, Rust, etc.) for now** - add later only if MVP is ahead of schedule

### 3.2 Integrated Terminal

- Embed terminal using node-pty and xterm.js
- Support multiple terminal tabs (can open 2-3 terminals)
- Basic run commands from context menu (e.g., "Run Python file")
- **Skip terminal split view, terminal history, advanced features**
- **Test: Terminal commands work, output displays correctly**

### 3.3 Git Integration (Keep It Really Simple)

**FOCUS: Just the basics for MVP. Diff viewers and fancy features can wait.**

- Show git status in file explorer with icons:
  - Modified files (orange "M" icon)
  - Untracked files (blue "U" icon)
  - No icon for clean files
- Basic git commands in menu: commit, push, pull
- Simple commit dialog with:
  - Text input for commit message
  - Checkboxes to stage modified files
  - "Commit & Push" button
- **Skip: Diff viewer, branch switching UI, merge tools, blame view**
- **Test: Commit changes successfully, push to remote**

## Phase 4: Debugging - The Holy Grail (Weeks 17-20)

**FOCUS: Python + Node.js only. Skip Java/C++ for demo.**

### 4.1 Debug UI Components

- Debug toolbar (play, pause, stop, step over, step into, step out)
- Breakpoint gutter in editor (click to add/remove)
- Variables panel
- Call stack panel
- Debug console

### 4.2 Debug Adapters (Limited Scope)

- Integrate Debug Adapter Protocol (DAP) client
- **Python debugger (debugpy)** - full support
- **Node.js/JavaScript debugger** - built-in
- Launch configurations (simple launch.json)
- **Skip Java, C++, other languages** - these can be future work

### 4.3 Core Debugging Features

- Set/remove breakpoints (click on line gutter)
- Variable inspection (hover and panel)
- Watch expressions
- Step through code execution
- Evaluate expressions in debug console

## Phase 5: Polish & Customization (Weeks 21-24)

**FOCUS: Dark mode is king. Keep UI simple with Tailwind. Don't overthink it.**

### 5.1 Themes & UI (Simple Is Beautiful)

- **Dark theme** (primary - this is what users want)
  - Monaco dark theme (Monokai or VS Code Dark+)
  - Dark sidebar and panels with Tailwind
- **Light theme** (secondary - basic implementation)
  - Monaco light theme
  - Light sidebar and panels
- Theme switcher in menu bar (one-click toggle)
- Use Tailwind for styling (easy, fast, no bloat)
- Basic icons for file explorer (use heroicons or similar free icon pack)
- **Don't overthink UI - functional and clean is enough**

### 5.2 Settings & Preferences (Keep It Simple)

- Settings modal/panel (JSON-based config file in app data folder)
- Basic settings:
  - Font size (12px, 14px, 16px, 18px - preset options)
  - Font family (monospace fonts: Consolas, Courier, Fira Code)
  - Tab size (2, 4 spaces)
  - Word wrap (on/off)
  - Auto-save (on/off, auto-save delay)
- Save workspace state (remember open files, panel sizes, last folder)
- **Skip: Keyboard shortcut customization, advanced editor configs**

### 5.3 Performance Optimization

**FOCUS: Test early and often. Electron apps crash if you ignore memory leaks.**

- Lazy load large files (Monaco's built-in virtualization helps)
- Virtual scrolling for file explorer with many files (use react-window)
- Optimize Monaco worker threads (limit concurrent workers)
- Check for memory leaks:
  - Test with long editing sessions (keep app open for hours)
  - Monitor memory usage in Task Manager
  - Close and reopen tabs, check memory doesn't increase
- **Test performance with real projects:**
  - Small project (< 10 files)
  - Medium project (50-100 files)
  - Large project (500+ files)

### 5.4 Nice-to-Have Features (Add ONLY If You're Ahead of Schedule)

- Search across files (Ctrl+Shift+F) - **Monaco has built-in search**
- Multi-cursor editing (Monaco has this built-in - Alt+Click)
- Code formatting (Prettier for JS/TS, Black for Python - call as external command)
- Error/warning underlines (already from LSP diagnostics in Phase 3)
- **Skip: Snippet support, advanced search, code minimap**

## Phase 6: Testing, Packaging & Presentation (Weeks 25-26+)

**FOCUS: Electron is finicky. Test early and often, not just now.**

### 6.1 Continuous Testing (CRITICAL: Do Throughout Development)

**Electron apps are finicky. Test often, not just at the end. This will save you weeks of debugging.**

- **Test on Windows after every major feature addition**
- Test with various project sizes:
  - Small project (< 10 files)
  - Medium project (50-100 files)
  - Large project (500+ files with nested folders)
- Test memory usage with long editing sessions:
  - Keep IDE open for 2+ hours of continuous use
  - Open and close many files
  - Check Task Manager - memory should stabilize, not grow
- Fix critical bugs as they appear (don't let them pile up)
- Test after each build/release to catch regressions
- **Optional: Test on Mac/Linux if you have access (nice to have, not required)**

### 6.2 Packaging & Distribution

- Create Windows installer (.exe) using electron-builder
- Add application icon and branding
- Create splash screen (optional but looks professional)
- Test installer on clean Windows machine

### 6.3 Documentation

- User guide (how to use key features)
- Architecture documentation (for presentation)
- Demo projects showing IDE capabilities
- README with installation and feature overview

### 6.4 Presentation Materials

- Prepare demo video (2-3 minutes showing key features)
- Create slide deck explaining:
- Architecture (Electron + React + Monaco + LSP + DAP)
- Key features and differentiators
- Technical challenges solved
- Live coding demo (have a backup recording!)
- Screenshots and performance metrics

## Key Features Summary (Realistic Scope)

✓ Multi-language syntax highlighting (Python, JS/TS, HTML, CSS, JSON, Markdown + more)
✓ Autocomplete and IntelliSense (Python & TypeScript via LSP)
✓ Integrated terminal
✓ Debugging support for Python & Node.js (breakpoints, variables, call stack)
✓ File explorer with basic git status
✓ Find/replace in file
✓ Dark mode theme (+ light mode)
✓ Tab management
✓ Settings persistence
✓ Modern, responsive UI

## Features Deferred to Post-MVP (Future Work)

- Advanced git (diff viewer, branch management, merge)
- Debuggers for Java, C++, other languages
- Search across all files in project
- Snippet support
- Keyboard shortcut customization
- Terminal split view
- Code collaboration features

## Future Android Port Considerations

- Use React Native or Capacitor to reuse UI components
- Replace Node.js file system with mobile alternatives (Capacitor Filesystem API)
- Adapt layout for touch and smaller screens
- Consider using CodeMirror instead of Monaco (better mobile support)
- LSP may need to run on remote server for mobile

## Development Tips & Best Practices

### Version Control Strategy:
- Create a GitHub repository from the start
- Commit after each major feature milestone
- Use meaningful commit messages
- Consider creating a `develop` branch for active development
- Keep `main` branch stable

### Learning Resources:
- **Monaco Editor**: https://microsoft.github.io/monaco-editor/playground.html
- **Electron**: https://www.electronjs.org/docs
- **LSP Specification**: https://microsoft.github.io/language-server-protocol/
- **DAP Specification**: https://microsoft.github.io/debug-adapter-protocol/

### When You Get Stuck:
1. Check Electron + Monaco boilerplate projects on GitHub
2. VS Code source code is open source - study its architecture
3. Look at similar projects: **Oni2**, **Cursor** (uses Electron), **GitHub Codespaces**
4. Stack Overflow is your friend
5. Don't hesitate to simplify features if they're blocking progress

## Academic Presentation Tips

### What Judges Will Care About:
- **Working demo** (even if limited features) beats incomplete feature list
- **Clear explanation** of technical decisions
- **Demonstration** of understanding (architecture, challenges solved)
- **Performance metrics** (startup time, memory usage, responsiveness)

### Key Metrics to Track:
- App startup time (target: < 3 seconds)
- Memory usage (target: < 500MB for typical project)
- File opening speed (target: < 100ms for files < 10MB)
- LSP response time (target: < 500ms for autocomplete)

### Presentation Structure:
1. **Introduction** (30 sec) - What problem are you solving?
2. **Demo** (2-3 min) - Show key features working
3. **Architecture** (1-2 min) - How did you build it? (Electron + React + Monaco + LSP + DAP)
4. **Challenges** (1 min) - What was hardest? (LSP integration, memory management)
5. **Future Work** (30 sec) - Android port, more languages
6. **Q&A** (2-3 min)

## Where You Might Hit a Wall (Reality Check)

### 1. LSP + DAP Integration - The Dark Side
**Python + TypeScript is doable, but expect endless little bugs.**

- **Autocomplete might randomly stop working** - LSP servers crash silently, restart them
- **Breakpoints may ignore code** - DAP communication can get out of sync, reset debug session
- **Debug consoles can eat your terminal output** - Output gets swallowed or duplicated
- **Fix strategy**: Log everything, have a "restart LSP" button, test with simple code first

### 2. Electron Memory Management - The Hunger Games
**Multiple tabs, terminal, Monaco, and LSP servers will chew RAM like cotton candy.**

- Don't open 50+ files in a test project too soon - start small
- Each Monaco editor instance can be 50-100MB
- LSP servers run in separate processes - can be 100-200MB each
- Terminal output can leak memory if not cleaned up
- **Monitor aggressively**: Use Task Manager religiously, set up memory warnings
- **Target**: Keep app under 500MB for typical use (3-5 open files)

### 3. Cross-Platform Surprises
- **Windows 10/11 = fine** (your primary target)
- **Mac/Linux = your app might throw tantrums** unless you test early
- File paths, permissions, terminal commands all differ
- **Recommendation**: Build for Windows first, add Mac/Linux support only if ahead of schedule

### 4. File System Operations - Treat This as Sacred
**Every bug here is catastrophic. Users lose work. You fail the course.**

- **Test filenames with**: spaces, special characters (é, ñ, 中文), emojis (🐍, 🚀), unicode
- **Test insane folder depths**: 50+ nested folders
- **Test edge cases**: files being deleted externally, permission errors, network drives
- **Implement**: File watchers, error handling, auto-backup, unsaved changes warnings
- **This is Phase 1 priority for a reason - don't rush it**

### 5. Terminal Integration - Keep It Minimal
**Node-pty + xterm.js is already spicy. Don't add fuel to the fire.**

- Skip terminal split view, history, advanced features for MVP
- Test with simple commands: `python file.py`, `npm install`, `git status`
- Handle Ctrl+C gracefully (killing processes in Electron terminals is tricky)
- **Don't try to build a full terminal emulator** - you're building an IDE

### 6. Future Android Port - The Phantom Menace
**This is basically "rewrite your life in Java/Kotlin/React Native hell."**

- Keep it as a dream for now (the "maybe later" slide in your presentation)
- Android port would be a **separate 6-month project**
- Different architecture, different challenges, different pain
- **Focus**: Make a killer desktop IDE first, then think about mobile

## Survival Tips & MVP Metrics

### Settings & Themes - Keep It Simple
- **Settings**: JSON config is perfect. Don't get lost in custom GUI sliders
- **Themes**: Focus on Dark Mode first. Light theme is just a polish checkbox
- **Simplicity wins** - especially when you're behind schedule

### MVP Performance Metrics (Must-Hit Targets)
- **Open file**: < 100ms (instant feels like < 50ms)
- **Memory usage**: < 500MB (for typical 3-5 file project)
- **LSP autocomplete response**: < 500ms (faster feels magical)
- **App startup**: < 3 seconds
- **If you hit these, you can call it "impressively functional"**

### When The Bugs Don't Stop Coming
1. **Narrow the scope** - Cut features, not quality
2. **One language at a time** - Master Python, then TypeScript
3. **Test relentlessly** - After every feature, after every bug fix
4. **Have a "restart" button** - For LSP servers, for the terminal, for everything
5. **Log everything** - Console logs, error boundaries, crash reports

### To-dos

- [ ] Set up development environment with Node.js, Electron, React, TypeScript, and Monaco Editor
- [ ] Create main window with 3-panel layout (file explorer, editor, output)
- [ ] Implement file system operations (open, save, create, delete, file tree) - TEST RELENTLESSLY
- [ ] Configure Monaco Editor for multi-language syntax highlighting and basic code intelligence
- [ ] Integrate Language Server Protocol for autocomplete and IntelliSense - EXPECT BUGS
- [ ] Add integrated terminal using node-pty and xterm.js - KEEP IT MINIMAL
- [ ] Implement basic git integration (status, diff, commit, push, pull)
- [ ] Build debugging support with DAP, breakpoints, variables panel, and call stack - HARDEST PART
- [ ] Add theme support (light/dark) and settings customization
- [ ] Optimize performance, add search across files, multi-cursor, and code formatting
- [ ] Package application for distribution with installer and branding
- [ ] Create documentation, demo video, and presentation materials