import React from 'react'
import { Heading2, Heading3, Heading4 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type Editor } from '@tiptap/react'

type Props = {
  editor: Editor
}

const ToolbarHeading: React.FC<Props> = ({ editor }) => {
  const HEADING_LEVEL = {
    2: {
      LEVEL: 2,
      icon: <Heading2 className='h-4 w-4' key={2} />,
      text: '見出し2',
    },
    3: {
      LEVEL: 3,
      icon: <Heading3 className='h-4 w-4' key={3} />,
      text: '見出し3',
    },
    4: {
      LEVEL: 4,
      icon: <Heading4 className='h-4 w-4' key={4} />,
      text: '見出し4',
    },
  } as const

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className={cn('gap-2', editor.isActive('heading') && 'bg-gray-200')}>
          {Object.values(HEADING_LEVEL).map(
            (heading) => editor.isActive('heading', { level: heading.LEVEL }) && heading.icon,
          )}
          {!editor.isActive('heading') && '見出し'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.values(HEADING_LEVEL).map((heading) => (
          <DropdownMenuItem
            key={heading.LEVEL}
            onClick={() => editor.chain().focus().toggleHeading({ level: heading.LEVEL }).run()}
            className={cn(
              'gap-2',
              editor.isActive('heading', { level: heading.LEVEL }) && 'bg-gray-100',
            )}>
            {heading.icon}
            <span>{heading.text}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ToolbarHeading
