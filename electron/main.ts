import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'
import chokidar from 'chokidar'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null
let currentWatcher: chokidar.FSWatcher | null = null

function createWindow() {
  win = new BrowserWindow({
    title: 'Charger ⚡',
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#1e1e1e',
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// IPC Handlers for file operations
ipcMain.handle('fs-read-file', async (_event, filePath: string) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    return { success: true, content }
  } catch (error) {
    console.error('Failed to read file:', error)
    return { success: false, error: String(error) }
  }
})

ipcMain.handle('fs-write-file', async (_event, filePath: string, content: string) => {
  try {
    await fs.writeFile(filePath, content, 'utf-8')
    return { success: true }
  } catch (error) {
    console.error('Failed to write file:', error)
    return { success: false, error: String(error) }
  }
})

ipcMain.handle('fs-read-directory', async (_event, dirPath: string) => {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true })
    return entries.map(entry => ({
      name: entry.name,
      isDirectory: entry.isDirectory(),
    }))
  } catch (error) {
    console.error('Failed to read directory:', error)
    return []
  }
})

ipcMain.handle('dialog-open-file', async () => {
  if (!win) return null
  const result = await dialog.showOpenDialog(win, {
    properties: ['openFile'],
  })
  return result.canceled ? null : result.filePaths[0]
})

ipcMain.handle('dialog-open-folder', async () => {
  if (!win) return null
  const result = await dialog.showOpenDialog(win, {
    properties: ['openDirectory'],
  })
  return result.canceled ? null : result.filePaths[0]
})

ipcMain.handle('dialog-save-file', async (_event, defaultFilename?: string) => {
  if (!win) return null
  const result = await dialog.showSaveDialog(win, {
    defaultPath: defaultFilename,
  })
  return result.canceled ? null : result.filePath
})

ipcMain.handle('watch-directory', async (_event, dirPath: string) => {
  if (currentWatcher) {
    currentWatcher.close()
  }
  currentWatcher = chokidar.watch(dirPath, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
  })

  currentWatcher.on('all', (event, path) => {
    win?.webContents.send('fs-change', { type: event, path })
  })

  return true
})

app.whenReady().then(() => {
  createWindow()
})
