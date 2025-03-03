import { type Editor } from '@tiptap/react'
import {
  Bold,
  Italic,
  List,
  Image as ImageIcon,
  Paintbrush,
  Highlighter,
  TableIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import ToolbarHeading from './ToolbarHeading'
import ColorPicker from './ColorPicker'
import TableMenu from './TableMenu'

type Props = {
  editor: Editor
}

const EditorToolbar = ({ editor }: Props) => {
  if (!editor) {
    return null
  }

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
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
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(editor.isActive('blockquote') && 'bg-gray-200')}>
        引用
      </Button>

      <ColorPicker
        onChange={(color) => editor.chain().focus().setColor(color).run()}
        trigger={
          <Button variant='ghost' size='sm'>
            <Paintbrush className='h-4 w-4' />
          </Button>
        }
      />

      {/* ハイライトピッカー */}
      <ColorPicker
        onChange={(color) => editor.chain().focus().setHighlight({ color }).run()}
        trigger={
          <Button variant='ghost' size='sm'>
            <Highlighter className='h-4 w-4' />
          </Button>
        }
      />

      <div className='flex items-center gap-1'>
        {!editor.isActive('table') && (
          <Button variant='ghost' size='sm' onClick={addTable}>
            <TableIcon className='h-4 w-4' />
          </Button>
        )}
        <TableMenu editor={editor} />
      </div>

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
