import { useEffect, useRef, useState } from 'react'

interface TerminalProps {
  isVisible: boolean
}

export default function Terminal({ isVisible }: TerminalProps) {
  const [history, setHistory] = useState<string[]>(['Welcome to Charger Terminal ⚡\n'])
  const [command, setCommand] = useState('')
  const terminalRef = useRef<HTMLDivElement>(null)

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return

    setHistory(prev => [...prev, `$ ${cmd}\n`])
    
    // Simulate command execution
    const result = `Command: ${cmd} executed\n`
    setHistory(prev => [...prev, result])
    
    setCommand('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(command)
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  if (!isVisible) return null

  return (
    <div className="flex flex-col h-full bg-dark-bg border-t border-dark-border">
      <div className="px-4 py-2 bg-dark-panel border-b border-dark-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-dark-text uppercase">Terminal</h3>
      </div>
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm text-dark-text"
      >
        {history.map((item, idx) => (
          <div key={idx}>{item}</div>
        ))}
      </div>
      <div className="flex items-center p-2 border-t border-dark-border">
        <span className="text-green-400 mr-2">$</span>
        <input
          type="text"
          value={command}
          onChange={e => setCommand(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent outline-none text-dark-text"
          placeholder="Enter command..."
        />
      </div>
    </div>
  )
}
