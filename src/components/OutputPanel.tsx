import { useState } from 'react'
import Terminal from './Terminal'

export default function OutputPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState<'output' | 'terminal'>('output')

  return (
    <div className={`h-48 border-t border-dark-border bg-dark-panel flex flex-col transition-all ${
      isCollapsed ? 'h-0' : ''
    }`}>
      <div className="flex border-b border-dark-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab('output')}
            className={`px-4 py-2 text-sm ${
              activeTab === 'output'
                ? 'bg-dark-bg text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Output
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-4 py-2 text-sm ${
              activeTab === 'terminal'
                ? 'bg-dark-bg text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Terminal
          </button>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto px-4 py-2 text-sm text-gray-400 hover:text-white"
        >
          {isCollapsed ? '▼' : '▲'}
        </button>
      </div>
      
      <div className="flex-1">
        {activeTab === 'terminal' ? (
          <Terminal isVisible={!isCollapsed} />
        ) : (
          <div className="p-4 font-mono text-xs text-dark-text h-full overflow-y-auto">
            <p>Output panel ready for build output...</p>
          </div>
        )}
      </div>
    </div>
  )
}