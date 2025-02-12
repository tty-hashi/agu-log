import React from 'react'
import { type Editor } from '@tiptap/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  Table2,
  RowsIcon,
  ColumnsIcon,
  Trash2,
  ArrowDownToLine,
  ArrowRightToLine,
  ArrowUpToLine,
  ArrowLeftToLine,
} from 'lucide-react'

type Props = {
  editor: Editor
}

const TableMenu: React.FC<Props> = ({ editor }) => {
  if (!editor.isActive('table')) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm'>
          <Table2 className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-48'>
        <DropdownMenuItem onClick={() => editor.chain().focus().addColumnBefore().run()}>
          <ArrowLeftToLine className='h-4 w-4 mr-2' />
          前に列を追加
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => editor.chain().focus().addColumnAfter().run()}>
          <ArrowRightToLine className='h-4 w-4 mr-2' />
          後ろに列を追加
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => editor.chain().focus().deleteColumn().run()}>
          <ColumnsIcon className='h-4 w-4 mr-2' />
          列を削除
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => editor.chain().focus().addRowBefore().run()}>
          <ArrowUpToLine className='h-4 w-4 mr-2' />
          前に行を追加
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => editor.chain().focus().addRowAfter().run()}>
          <ArrowDownToLine className='h-4 w-4 mr-2' />
          後ろに行を追加
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => editor.chain().focus().deleteRow().run()}>
          <RowsIcon className='h-4 w-4 mr-2' />
          行を削除
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => editor.chain().focus().deleteTable().run()}
          className='text-red-600 hover:text-red-600'>
          <Trash2 className='h-4 w-4 mr-2' />
          テーブルを削除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TableMenu
