import { useState, useEffect } from 'react'

interface FileEntry {
  name: string
  isDirectory: boolean
  path: string
}

interface SidebarProps {
  currentDirectory: string | null
  onOpenFile: (filePath: string) => Promise<void>
  onOpenFolder: () => Promise<void>
}

export default function Sidebar({ currentDirectory, onOpenFile, onOpenFolder }: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [folderContents, setFolderContents] = useState<Map<string, FileEntry[]>>(new Map())

  // Load root folder contents when directory is set
  useEffect(() => {
    if (currentDirectory && !folderContents.has(currentDirectory)) {
      loadFolderContents(currentDirectory)
      setExpandedFolders(prev => new Set(prev).add(currentDirectory))
    }
  }, [currentDirectory])

  const loadFolderContents = async (dirPath: string) => {
    const contents = await window.electronAPI.readDirectory(dirPath)
    console.log(`Loading directory: ${dirPath}`, contents)
    if (contents) {
      const fileEntries: FileEntry[] = contents
        .map(item => {
          // Use proper path joining for Windows
          const separator = dirPath.includes('\\') ? '\\' : '/'
          return {
            name: item.name,
            isDirectory: item.isDirectory,
            path: `${dirPath}${separator}${item.name}`,
          }
        })
        // Sort: folders first, then files
        .sort((a, b) => {
          if (a.isDirectory && !b.isDirectory) return -1
          if (!a.isDirectory && b.isDirectory) return 1
          return a.name.localeCompare(b.name)
        })
      setFolderContents(prev => new Map(prev.set(dirPath, fileEntries)))
    }
  }

  const toggleFolder = async (folderPath: string) => {
    if (expandedFolders.has(folderPath)) {
      setExpandedFolders(prev => {
        const newSet = new Set(prev)
        newSet.delete(folderPath)
        return newSet
      })
      return
    }

    // Load folder contents if not already loaded
    if (!folderContents.has(folderPath)) {
      await loadFolderContents(folderPath)
    }
    setExpandedFolders(prev => new Set(prev).add(folderPath))
  }

  const renderItem = (item: FileEntry, level: number = 0): JSX.Element => {
    const isExpanded = expandedFolders.has(item.path)
    const contents = folderContents.get(item.path) || []

    return (
      <div key={item.path} className="select-none">
        <div
          className="flex items-center px-2 py-1 cursor-pointer hover:bg-dark-hover"
          onClick={async () => {
            if (item.isDirectory) {
              await toggleFolder(item.path)
            } else {
              await onOpenFile(item.path)
            }
          }}
          style={{ 
            paddingLeft: `${(level * 16) + 8}px`,
            marginLeft: level > 0 ? '8px' : '0px'
          }}
        >
          <span className="mr-2 text-gray-500">
            {item.isDirectory ? (isExpanded ? '▼' : '▶') : ''}
          </span>
          <span className={item.isDirectory ? 'text-yellow-300' : 'text-gray-300'}>
            {item.isDirectory ? '📁' : '📄'} {item.name}
          </span>
        </div>
        {item.isDirectory && isExpanded && contents.length > 0 && (
          <div>
            {contents.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-64 bg-dark-panel border-r border-dark-border flex flex-col">
      <div className="px-4 py-3 border-b border-dark-border flex justify-between items-center">
        <h2 className="text-sm font-semibold text-dark-text uppercase tracking-wide">
          Explorer
        </h2>
        <button
          onClick={onOpenFolder}
          className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-dark-hover"
          title="Open Folder"
        >
          📂
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 text-sm">
        {currentDirectory ? (
          <div>
            <div className="px-2 py-1 text-xs text-gray-400 mb-2 border-b border-dark-border">
              📂 {currentDirectory.split(/[/\\]/).pop()}
            </div>
            {expandedFolders.has(currentDirectory) && folderContents.has(currentDirectory) && (
              <div>
                {folderContents.get(currentDirectory)?.map(item => renderItem(item, 0))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p className="text-sm mb-4">No folder open</p>
            <button
              onClick={onOpenFolder}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
            >
              Open Folder
            </button>
          </div>
        )}
      </div>
    </div>
  )
}