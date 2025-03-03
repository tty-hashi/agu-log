import { EditorContent } from '@tiptap/react'
import EditorToolbar from './components/EditorToolbar'
import { useCreateEditor } from './useEditorSetting'

type Props = {
  content: string
  onChange: (content: string) => void
}

const Editor = ({ content, onChange }: Props) => {
  const editor = useCreateEditor({ content, onChange })

  if (!editor) {
    return null
  }

  return (
    <div className='border rounded-lg overflow-hidden'>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor
