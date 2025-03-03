import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Props = {
  onChange: (color: string) => void
  trigger: React.ReactNode
}

const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']

const ColorPicker: React.FC<Props> = ({ onChange, trigger }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className='grid grid-cols-4 gap-1 p-2'>
          {colors.map((color) => (
            <button
              key={color}
              className='w-6 h-6 rounded border border-gray-200'
              style={{ backgroundColor: color }}
              onClick={() => onChange(color)}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ColorPicker
