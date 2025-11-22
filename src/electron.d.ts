export interface ElectronAPI {
  ipcRenderer: {
    on(channel: string, listener: (event: any, ...args: any[]) => void): void
    off(channel: string, listener: (event: any, ...args: any[]) => void): void
    send(channel: string, ...args: any[]): void
    invoke(channel: string, ...args: any[]): Promise<any>
  }
  
  readFile(filePath: string): Promise<{ success: boolean; content?: string; error?: string }>
  writeFile(filePath: string, content: string): Promise<{ success: boolean; error?: string }>
  readDirectory(dirPath: string): Promise<Array<{ name: string; isDirectory: boolean }>>
  showOpenDialog(): Promise<string | null>
  showOpenFolderDialog(): Promise<string | null>
  showSaveDialog(defaultFilename?: string): Promise<string | null>
  watchDirectory(dirPath: string): Promise<boolean>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export {}
