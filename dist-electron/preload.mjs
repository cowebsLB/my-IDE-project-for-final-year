"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  // IPC methods
  ipcRenderer: {
    on(...args) {
      const [channel, listener] = args;
      return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
    },
    off(...args) {
      const [channel, ...omit] = args;
      return electron.ipcRenderer.off(channel, ...omit);
    },
    send(...args) {
      const [channel, ...omit] = args;
      return electron.ipcRenderer.send(channel, ...omit);
    },
    invoke(...args) {
      const [channel, ...omit] = args;
      return electron.ipcRenderer.invoke(channel, ...omit);
    }
  },
  // File system operations
  readFile(filePath) {
    return electron.ipcRenderer.invoke("fs-read-file", filePath);
  },
  writeFile(filePath, content) {
    return electron.ipcRenderer.invoke("fs-write-file", filePath, content);
  },
  readDirectory(dirPath) {
    return electron.ipcRenderer.invoke("fs-read-directory", dirPath);
  },
  showOpenDialog() {
    return electron.ipcRenderer.invoke("dialog-open-file");
  },
  showOpenFolderDialog() {
    return electron.ipcRenderer.invoke("dialog-open-folder");
  },
  showSaveDialog(defaultFilename) {
    return electron.ipcRenderer.invoke("dialog-save-file", defaultFilename);
  },
  watchDirectory(dirPath) {
    return electron.ipcRenderer.invoke("watch-directory", dirPath);
  }
});
