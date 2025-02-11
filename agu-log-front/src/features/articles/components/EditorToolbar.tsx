import { type Editor } from '@tiptap/react'
import { Bold, Italic, List, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import ToolbarHeading from './ToolbarHeading'

type Props = {
  editor: Editor
}

const EditorToolbar = ({ editor }: Props) => {
  if (!editor) {
    return null
  }

  return (
    <div className='border-b bg-gray-50 p-2 flex gap-1 flex-wrap items-center'>
      <ToolbarHeading editor={editor} />
      <div className='w-px h-6 bg-gray-300 mx-1' />

      <Button
        variant='ghost'
        size='sm'
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(editor.isActive('bold') && 'bg-gray-200')}>
        <Bold className='h-4 w-4' />
      </Button>

      <Button
        variant='ghost'
        size='sm'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(editor.isActive('italic') && 'bg-gray-200')}>
        <Italic className='h-4 w-4' />
      </Button>

      <Button
        variant='ghost'
        size='sm'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(editor.isActive('bulletList') && 'bg-gray-200')}>
        <List className='h-4 w-4' />
      </Button>

      <Button
        variant='ghost'
        size='sm'
        onClick={() => {
          const url = window.prompt('画像のURLを入力してください')
          if (url) {
            editor.chain().focus().setImage({ src: url }).run()
          }
        }}>
        <ImageIcon className='h-4 w-4' />
      </Button>
    </div>
  )
}

export default EditorToolbar
