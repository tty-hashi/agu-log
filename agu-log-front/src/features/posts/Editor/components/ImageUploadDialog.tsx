'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'
import { uploadImage } from '../image-upload'

export interface UploadedImage {
  id: string
  url: string
  width: number
  height: number
}

interface ImageUploadDialogProps {
  isOpen: boolean
  onClose: () => void
  onImageUploaded: (image: UploadedImage) => void
}

export function ImageUploadDialog({ isOpen, onClose, onImageUploaded }: ImageUploadDialogProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const maxSize = 2 // 2MB
  const maxSizeBytes = maxSize * 1024 * 1024
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      if (files[0]) {
        handleFileUpload(files[0])
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      if (files[0]) {
        handleFileUpload(files[0])
      }
    }
  }

  const handleFileUpload = async (file: File) => {
    // ファイル検証
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        '許可されていないファイル形式です。JPEG、PNG、またはWEBP形式の画像をアップロードしてください。',
      )
      return
    }

    if (file.size > maxSizeBytes) {
      toast.error(
        `ファイルサイズが大きすぎます。${maxSize}MB以下の画像をアップロードしてください。`,
      )
      return
    }

    // プレビュー表示
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // アップロード処理
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await uploadImage(formData)

      if (!response.success) {
        throw new Error(response.error || 'アップロードに失敗しました')
      }

      toast.success('画像をアップロードしました')
      onImageUploaded(response as UploadedImage)
      handleReset()
      onClose()
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '画像のアップロードに失敗しました'
      toast.error(errorMessage)
    } finally {
      setIsUploading(false)
    }
  }

  const handleReset = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>画像をアップロード</DialogTitle>
          <DialogDescription>記事に挿入する画像をアップロードします。</DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          {preview ? (
            <div className='relative overflow-hidden border rounded-md'>
              <div className='aspect-video relative overflow-hidden'>
                <Image
                  src={preview}
                  alt='アップロード画像プレビュー'
                  fill
                  sizes='(max-width: 768px) 100vw, 50vw'
                  className='object-contain'
                />
              </div>

              <Button
                variant='ghost'
                size='icon'
                className='absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm'
                onClick={handleReset}
                disabled={isUploading}>
                <X className='h-4 w-4' />
              </Button>

              {isUploading && (
                <div className='absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm'>
                  <div className='text-center'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2'></div>
                    <p className='text-sm font-medium'>アップロード中...</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging ? 'border-primary bg-primary/5' : 'border-input'
              } transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer min-h-[200px]`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}>
              <div className='rounded-full bg-background/80 p-3 backdrop-blur-sm'>
                {isDragging ? (
                  <Upload className='h-8 w-8 text-primary' />
                ) : (
                  <ImageIcon className='h-8 w-8 text-muted-foreground' />
                )}
              </div>
              <div className='flex flex-col items-center gap-1'>
                <p className='text-sm font-medium'>
                  {isDragging ? 'ドロップしてアップロード' : '画像をアップロード'}
                </p>
                <p className='text-xs text-muted-foreground'>
                  ドラッグ＆ドロップまたはクリックしてファイルを選択
                </p>
                <p className='text-xs text-muted-foreground'>最大{maxSize}MB・JPG, PNG, WEBP形式</p>
              </div>

              <input
                type='file'
                ref={fileInputRef}
                className='hidden'
                accept='image/jpeg,image/png,image/webp'
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </div>
          )}

          <div className='flex justify-end gap-2'>
            <Button variant='outline' onClick={onClose} disabled={isUploading}>
              キャンセル
            </Button>
            {preview && !isUploading && (
              <Button
                type='button'
                onClick={() => {
                  if (fileInputRef.current?.files?.[0]) {
                    handleFileUpload(fileInputRef.current.files[0])
                  }
                }}>
                アップロード
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
