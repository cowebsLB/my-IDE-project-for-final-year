# Charger - Electron IDE

A powerful IDE built with Electron, React, TypeScript, and Monaco Editor. Features a modern code editor with file system operations, terminal integration, and comprehensive development tools.

## Technology Stack

Electron, React, TypeScript, Monaco Editor, Tailwind CSS, Vite

## Features

- **Code Editor**:
  - Monaco Editor integration (VS Code editor)
  - Syntax highlighting
  - Code completion
  - Multi-language support
- **File System**:
  - File explorer sidebar
  - File operations (open, save, create, delete)
  - Project management
- **Development Tools**:
  - Terminal integration
  - Output panel
  - Build and run capabilities
- **Modern UI**:
  - React + TypeScript
  - Tailwind CSS styling
  - Responsive layout
  - Dark/light theme support
- **Electron Desktop App**:
  - Cross-platform desktop application
  - Native file system access
  - System integration

## Project Structure

```
- `src/` - Source code
  - `App.tsx` - Main app component
  - `components/` - React components
    - `Editor.tsx` - Code editor
    - `MonacoEditor.tsx` - Monaco editor wrapper
    - `Sidebar.tsx` - File explorer sidebar
    - `Terminal.tsx` - Terminal component
    - `OutputPanel.tsx` - Output panel
  - `main.tsx` - React entry point
- `electron/` - Electron main process
  - `main.ts` - Main process
  - `preload.ts` - Preload script
- `dist-electron/` - Compiled Electron files
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind configuration
- `electron-builder.json5` - Electron builder config
- `package.json` - Dependencies
- `FEATURES.md` - Feature documentation
- `PHASE1_COMPLETE.md` - Phase 1 completion notes
```

## Use Cases

- Desktop code editor
- Development IDE
- Code editing tool
- Project development environment
- Final year project

## Installation

```bash
npm install
```

## Status

In Development - Electron IDE with Monaco Editor (Phase 1 in progress)

---

## Existing Documentation

# Charger ⚡

A powerful IDE built with Electron, React, TypeScript, and Monaco Editor.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development mode:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Tech Stack

- **Framework**: Electron
- **UI**: React + TypeScript
- **Editor**: Monaco Editor
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## Development Status

Phase 1: Basic Editor Setup (In Progress)
- [x] Project setup with Electron + React + TypeScript
- [ ] Integrate Monaco Editor
- [ ] Create 3-panel layout (file explorer, editor, output)
- [ ] Implement file system operations