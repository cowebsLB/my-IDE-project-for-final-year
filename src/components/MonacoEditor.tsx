import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/python/python'
import 'codemirror/mode/markdown/markdown'

interface MonacoEditorProps {
  value: string
  language: string
  onChange: (value: string) => void
  theme?: string
}

export default function MonacoEditor({ value, language, onChange }: MonacoEditorProps) {
  // Map language to CodeMirror mode
  const getMode = (lang: string) => {
    const modeMap: Record<string, string> = {
      'html': 'htmlmixed',
      'javascript': 'javascript',
      'typescript': 'javascript',
      'css': 'css',
      'json': 'javascript',
      'xml': 'xml',
      'python': 'python',
      'markdown': 'markdown',
    }
    return modeMap[lang] || 'javascript'
  }

  return (
    <div className="w-full h-full">
      <style>{`
        .CodeMirror {
          height: 100% !important;
        }
        .CodeMirror-scroll {
          height: 100%;
        }
      `}</style>
      <CodeMirror
        value={value}
        options={{
          mode: getMode(language),
          theme: 'monokai',
          lineNumbers: true,
          lineWrapping: true,
          autoCloseBrackets: true,
          matchBrackets: true,
          indentUnit: 2,
          tabSize: 2,
          indentWithTabs: false,
        }}
        onBeforeChange={(editor, data, value) => {
          onChange(value)
        }}
      />
    </div>
  )
}