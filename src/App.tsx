import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
// import OutputPanel from './components/OutputPanel' // Temporarily disabled

interface FileData {
  id: string
  name: string
  path: string
  content: string
  language: string
  isDirty: boolean
}

function App() {
  const [openFiles, setOpenFiles] = useState<FileData[]>([])
  const [activeFileId, setActiveFileId] = useState<string | null>(null)
  const [currentDirectory, setCurrentDirectory] = useState<string | null>(null)

  const getFileName = (filePath: string): string => {
    const parts = filePath.split(/[/\\]/)
    return parts[parts.length - 1]
  }

  const getLanguageFromFilename = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase()
    const languageMap: Record<string, string> = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'md': 'markdown',
      'mdx': 'markdown',
      'xml': 'xml',
      'c': 'c',
      'cpp': 'cpp',
      'java': 'java',
      'go': 'go',
      'rs': 'rust',
    }
    return languageMap[ext || ''] || 'plaintext'
  }

  const handleOpenFile = async (filePath: string) => {
    if (!filePath) return

    const existingFile = openFiles.find(f => f.path === filePath)
    if (existingFile) {
      setActiveFileId(existingFile.id)
      return
    }

    const result = await window.electronAPI.readFile(filePath)
    if (result.success && result.content !== undefined) {
      const fileName = getFileName(filePath)
      const newFile: FileData = {
        id: `file-${Date.now()}`,
        name: fileName,
        path: filePath,
        content: result.content,
        language: getLanguageFromFilename(fileName),
        isDirty: false,
      }
      setOpenFiles(prev => [...prev, newFile])
      setActiveFileId(newFile.id)
    }
  }

  const handleSaveFile = async (fileId: string) => {
    const file = openFiles.find(f => f.id === fileId)
    if (!file || !file.isDirty) return true

    if (!file.path) {
      return false // Need to use Save As
    }

    const result = await window.electronAPI.writeFile(file.path, file.content)
    if (result.success) {
      setOpenFiles(prev =>
        prev.map(f => f.id === fileId ? { ...f, isDirty: false } : f)
      )
      return true
    }
    return false
  }

  const handleSaveFileAs = async (fileId: string) => {
    const file = openFiles.find(f => f.id === fileId)
    if (!file) return false

    const savePath = await window.electronAPI.showSaveDialog(file.name)
    if (!savePath) return false

    const result = await window.electronAPI.writeFile(savePath, file.content)
    if (result.success) {
      const fileName = getFileName(savePath)
      setOpenFiles(prev =>
        prev.map(f =>
          f.id === fileId
            ? { ...f, path: savePath, name: fileName, isDirty: false }
            : f
        )
      )
      return true
    }
    return false
  }

  const handleNewFile = () => {
    const newFile: FileData = {
      id: `file-${Date.now()}`,
      name: 'Untitled',
      path: '',
      content: '',
      language: 'plaintext',
      isDirty: false,
    }
    setOpenFiles(prev => [...prev, newFile])
    setActiveFileId(newFile.id)
  }

  const handleCloseFile = async (fileId: string) => {
    const file = openFiles.find(f => f.id === fileId)
    
    if (file?.isDirty) {
      const shouldClose = window.confirm(
        `Do you want to save changes to "${file.name}"?`
      )
      if (shouldClose) {
        const saved = await handleSaveFile(fileId)
        if (!saved) return
      }
    }

    setOpenFiles(prev => {
      const filtered = prev.filter(f => f.id !== fileId)
      if (filtered.length > 0 && activeFileId === fileId) {
        setActiveFileId(filtered[0].id)
      } else {
        setActiveFileId(null)
      }
      return filtered
    })
  }

  const handleOpenFolder = async () => {
    const folderPath = await window.electronAPI.showOpenFolderDialog()
    if (folderPath) {
      setCurrentDirectory(folderPath)
      await window.electronAPI.watchDirectory(folderPath)
    }
  }

  // Handle file system change events
  useEffect(() => {
    const handleFsChange = () => {
      // Refresh directory contents when files change
      console.log('File system change detected')
    }

    if (window.electronAPI) {
      window.electronAPI.ipcRenderer.on('fs-change', handleFsChange)
    }

    return () => {
      if (window.electronAPI) {
        window.electronAPI.ipcRenderer.off('fs-change', handleFsChange)
      }
    }
  }, [currentDirectory])

  const handleEditorChange = (value: string) => {
    if (activeFileId) {
      setOpenFiles(prev =>
        prev.map(f =>
          f.id === activeFileId ? { ...f, content: value, isDirty: true } : f
        )
      )
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'o' && !e.shiftKey) {
        e.preventDefault()
        window.electronAPI.showOpenDialog().then(path => {
          if (path) handleOpenFile(path)
        })
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's' && !e.shiftKey) {
        e.preventDefault()
        if (activeFileId) handleSaveFile(activeFileId)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's' && e.shiftKey) {
        e.preventDefault()
        if (activeFileId) handleSaveFileAs(activeFileId)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        handleNewFile()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
        e.preventDefault()
        if (activeFileId) handleCloseFile(activeFileId)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeFileId])

  const activeFile = openFiles.find(f => f.id === activeFileId)

  return (
    <div className="flex h-screen bg-dark-bg">
      {/* Left Sidebar - File Explorer */}
      <Sidebar
        currentDirectory={currentDirectory}
        onOpenFile={handleOpenFile}
        onOpenFolder={handleOpenFolder}
      />
      
      {/* Center - Editor Area */}
      <div className="flex-1 flex flex-col">
        <Editor
          openFiles={openFiles}
          activeFileId={activeFileId}
          activeFile={activeFile}
          onSetActiveFile={setActiveFileId}
          onCloseFile={handleCloseFile}
          onEditorChange={handleEditorChange}
        />
      </div>
      
      {/* Bottom - Output Panel */}
      {/* <OutputPanel /> */}
    </div>
  )
}

export default App