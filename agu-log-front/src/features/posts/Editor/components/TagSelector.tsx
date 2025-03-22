'use client'
import { toast } from 'sonner'

import * as React from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useTags } from '@/hooks/useTags'

interface TagSelectorProps {
  selectedTagIds: string[]
  onChange: (tagIds: string[]) => void
  maxTags?: number
}

export function TagSelector({ selectedTagIds, onChange, maxTags = 5 }: TagSelectorProps) {
  const [open, setOpen] = useState(false)

  const { tags, categories, isLoading, isError, categoriesError } = useTags()

  if (isError) {
    toast.error(categoriesError.Error)
  }

  // 選択済みのタグを管理
  const selectedTags = tags.filter((tag) => selectedTagIds.includes(tag.id))

  // タグの選択を処理
  const handleSelect = (tagId: string) => {
    if (selectedTagIds.includes(tagId)) {
      // 既に選択済みなら削除
      onChange(selectedTagIds.filter((id) => id !== tagId))
    } else if (selectedTagIds.length < maxTags) {
      // 最大数未満なら追加
      onChange([...selectedTagIds, tagId])
    }
  }

  // タグの削除を処理
  const handleRemove = (tagId: string) => {
    onChange(selectedTagIds.filter((id) => id !== tagId))
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-col space-y-2'>
        <div className='flex items-center justify-between'>
          <label className='text-sm font-medium'>タグ（最大{maxTags}個）</label>
          <span className='text-xs text-muted-foreground'>
            {selectedTagIds.length}/{maxTags}
          </span>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='justify-between w-full'
              disabled={isLoading || selectedTagIds.length >= maxTags}>
              {isLoading
                ? '読み込み中...'
                : selectedTagIds.length >= maxTags
                  ? 'タグ数上限です'
                  : 'タグを選択してください'}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='p-0 w-full min-w-[300px]'>
            <Command>
              <CommandInput placeholder='タグを検索...' />
              <CommandEmpty>タグが見つかりません</CommandEmpty>
              {categories.map((category) => (
                <CommandGroup key={category.id} heading={category.name}>
                  {tags
                    .filter((tag) => tag.category.id === category.id)
                    .map((tag) => (
                      <CommandItem
                        key={tag.id}
                        value={tag.name}
                        onSelect={() => {
                          handleSelect(tag.id)
                          setOpen(false)
                        }}>
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedTagIds.includes(tag.id) ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {tag.name}
                      </CommandItem>
                    ))}
                </CommandGroup>
              ))}
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* 選択済みタグの表示 */}
      {selectedTags.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {selectedTags.map((tag) => (
            <Badge key={tag.id} variant='secondary' className='flex items-center gap-1'>
              {tag.name}
              <button
                type='button'
                onClick={() => handleRemove(tag.id)}
                className='h-4 w-4 rounded-full hover:bg-muted'>
                <X className='h-3 w-3' />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
