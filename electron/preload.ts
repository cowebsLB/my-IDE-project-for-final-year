import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electronAPI', {
  // IPC methods
  ipcRenderer: {
    on(...args: Parameters<typeof ipcRenderer.on>) {
      const [channel, listener] = args
      return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
    },
    off(...args: Parameters<typeof ipcRenderer.off>) {
      const [channel, ...omit] = args
      return ipcRenderer.off(channel, ...omit)
    },
    send(...args: Parameters<typeof ipcRenderer.send>) {
      const [channel, ...omit] = args
      return ipcRenderer.send(channel, ...omit)
    },
    invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
      const [channel, ...omit] = args
      return ipcRenderer.invoke(channel, ...omit)
    },
  },

  // File system operations
  readFile(filePath: string) {
    return ipcRenderer.invoke('fs-read-file', filePath)
  },

  writeFile(filePath: string, content: string) {
    return ipcRenderer.invoke('fs-write-file', filePath, content)
  },

  readDirectory(dirPath: string) {
    return ipcRenderer.invoke('fs-read-directory', dirPath)
  },

  showOpenDialog() {
    return ipcRenderer.invoke('dialog-open-file')
  },

  showOpenFolderDialog() {
    return ipcRenderer.invoke('dialog-open-folder')
  },

  showSaveDialog(defaultFilename?: string) {
    return ipcRenderer.invoke('dialog-save-file', defaultFilename)
  },

  watchDirectory(dirPath: string) {
    return ipcRenderer.invoke('watch-directory', dirPath)
  },
})