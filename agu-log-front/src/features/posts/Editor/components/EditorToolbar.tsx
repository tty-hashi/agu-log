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
import { useState } from 'react'
import { ImageUploadDialog, UploadedImage } from './ImageUploadDialog'

type Props = {
  editor: Editor
}

const EditorToolbar = ({ editor }: Props) => {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)

  if (!editor) {
    return null
  }

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  const handleImageUploaded = (image: UploadedImage) => {
    editor
      .chain()
      .focus()
      .setImage({
        src: image.url,
        alt: '投稿画像',
        // width: image.width,
        // height: image.height,
      })
      .run()
  }

  // 各ボタンのクリックハンドラー中でイベントの伝播を止める
  const handleButtonClick = (callback: () => void) => (e: React.MouseEvent) => {
    e.preventDefault() // これによりフォームのsubmitが防止される
    callback()
  }

  return (
    <div className='border-b bg-gray-50 p-2 flex gap-1 flex-wrap items-center'>
      <ToolbarHeading editor={editor} />
      <div className='w-px h-6 bg-gray-300 mx-1' />

      <Button
        type='button' // typeを明示的に指定
        variant='ghost'
        size='sm'
        onClick={handleButtonClick(() => editor.chain().focus().toggleBold().run())}
        className={cn(editor.isActive('bold') && 'bg-gray-200')}>
        <Bold className='h-4 w-4' />
      </Button>

      <Button
        type='button'
        variant='ghost'
        size='sm'
        onClick={handleButtonClick(() => editor.chain().focus().toggleItalic().run())}
        className={cn(editor.isActive('italic') && 'bg-gray-200')}>
        <Italic className='h-4 w-4' />
      </Button>

      <Button
        type='button'
        variant='ghost'
        size='sm'
        onClick={handleButtonClick(() => editor.chain().focus().toggleBulletList().run())}
        className={cn(editor.isActive('bulletList') && 'bg-gray-200')}>
        <List className='h-4 w-4' />
      </Button>

      <Button
        type='button'
        variant='ghost'
        size='sm'
        onClick={handleButtonClick(() => editor.chain().focus().toggleBlockquote().run())}
        className={cn(editor.isActive('blockquote') && 'bg-gray-200')}>
        引用
      </Button>

      <ColorPicker
        onChange={(color) => editor.chain().focus().setColor(color).run()}
        trigger={
          <Button type='button' variant='ghost' size='sm'>
            <Paintbrush className='h-4 w-4' />
          </Button>
        }
      />

      {/* ハイライトピッカー */}
      <ColorPicker
        onChange={(color) => editor.chain().focus().setHighlight({ color }).run()}
        trigger={
          <Button type='button' variant='ghost' size='sm'>
            <Highlighter className='h-4 w-4' />
          </Button>
        }
      />

      <div className='flex items-center gap-1'>
        {!editor.isActive('table') && (
          <Button type='button' variant='ghost' size='sm' onClick={handleButtonClick(addTable)}>
            <TableIcon className='h-4 w-4' />
          </Button>
        )}
        <TableMenu editor={editor} />
      </div>

      {/* 画像アップロードボタン */}
      <Button
        type='button'
        variant='ghost'
        size='sm'
        onClick={handleButtonClick(() => setIsImageDialogOpen(true))}>
        <ImageIcon className='h-4 w-4' />
      </Button>

      {/* 画像アップロードダイアログ */}
      <ImageUploadDialog
        isOpen={isImageDialogOpen}
        onClose={() => setIsImageDialogOpen(false)}
        onImageUploaded={handleImageUploaded}
      />
    </div>
  )
}

export default EditorToolbar
