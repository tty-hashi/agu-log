import { PostType } from '@prisma/client'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface PostTypeSelectorProps {
  value: PostType
  onChange: (value: PostType) => void
}

const POST_TYPE_LABELS: Record<PostType, { label: string; description: string }> = {
  diary: {
    label: '日記',
    description: '日々の農作業や観察記録',
  },
  poem: {
    label: 'ポエム',
    description: '農業や自然に関する感想・エッセイ',
  },
  tech: {
    label: '技術',
    description: '栽培技術やノウハウの共有',
  },
  question: {
    label: '質問',
    description: '疑問点や相談事項',
  },
  review: {
    label: 'レビュー',
    description: '農機具や種苗のレビュー',
  },
}

export function PostTypeSelector({ value, onChange }: PostTypeSelectorProps) {
  return (
    <div className='space-y-3'>
      <h3 className='text-sm font-medium'>記事タイプ</h3>
      <RadioGroup
        value={value}
        onValueChange={(value) => onChange(value as PostType)}
        className='grid grid-cols-2 gap-4 sm:grid-cols-5'>
        {Object.entries(POST_TYPE_LABELS).map(([type, { label, description }]) => (
          <div key={type} className='space-y-2'>
            <RadioGroupItem value={type} id={`post-type-${type}`} className='peer sr-only' />
            <Label
              htmlFor={`post-type-${type}`}
              className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
              <span>{label}</span>
              <span className='text-xs text-muted-foreground text-center mt-1'>{description}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
