import { useState, useEffect } from 'react'
import MonacoEditor from './MonacoEditor'

interface FileData {
  id: string
  name: string
  path: string
  content: string
  language: string
  isDirty: boolean
}

interface EditorProps {
  openFiles: FileData[]
  activeFileId: string | null
  activeFile: FileData | undefined
  onSetActiveFile: (id: string) => void
  onCloseFile: (id: string) => Promise<void>
  onEditorChange: (value: string) => void
}

export default function Editor({
  openFiles,
  activeFileId,
  activeFile,
  onSetActiveFile,
  onCloseFile,
  onEditorChange,
}: EditorProps) {
  const [showFindReplace, setShowFindReplace] = useState(false)
  const [findText, setFindText] = useState('')
  const [replaceText, setReplaceText] = useState('')

  // Keyboard shortcut for Find (Ctrl+F)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault()
        setShowFindReplace(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="flex-1 flex flex-col">
      {/* Find & Replace Bar */}
      {showFindReplace && (
        <div className="border-b border-dark-border bg-dark-panel px-4 py-2 flex items-center gap-4">
          <div className="flex-1 flex items-center gap-2">
            <span className="text-xs text-gray-400">Find:</span>
            <input
              type="text"
              value={findText}
              onChange={e => setFindText(e.target.value)}
              className="flex-1 bg-dark-hover border border-dark-border rounded px-2 py-1 text-sm text-dark-text outline-none"
              placeholder="Search..."
            />
            <span className="text-xs text-gray-400">Replace:</span>
            <input
              type="text"
              value={replaceText}
              onChange={e => setReplaceText(e.target.value)}
              className="flex-1 bg-dark-hover border border-dark-border rounded px-2 py-1 text-sm text-dark-text outline-none"
              placeholder="Replace with..."
            />
            <button
              onClick={() => setShowFindReplace(false)}
              className="px-2 py-1 hover:bg-dark-hover rounded"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Tab Bar */}
      <div className="flex border-b border-dark-border bg-dark-panel overflow-x-auto">
        {openFiles.length === 0 ? (
          <div className="px-4 py-2 text-sm text-gray-500">
            No files open
          </div>
        ) : (
          openFiles.map((tab) => (
            <div
              key={tab.id}
              onClick={() => onSetActiveFile(tab.id)}
              className={`flex items-center px-4 py-2 cursor-pointer border-r border-dark-border text-sm ${
                activeFileId === tab.id
                  ? 'bg-dark-bg text-white'
                  : 'bg-dark-panel text-dark-text hover:bg-dark-hover'
              }`}
            >
              {tab.isDirty && <span className="mr-2 text-yellow-500">•</span>}
              📄 {tab.name}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onCloseFile(tab.id)
                }}
                className="ml-2 hover:text-white"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-auto">
        {activeFile ? (
          <MonacoEditor
            key={activeFile.id}
            value={activeFile.content}
            language={activeFile.language}
            onChange={onEditorChange}
            theme="vs-dark"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <h3 className="text-lg font-semibold mb-2">⚡ Charger</h3>
              <p className="text-sm">Open a file to start editing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}