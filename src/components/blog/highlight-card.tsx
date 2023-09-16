import dayjs from 'dayjs'
import { CalendarIcon } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

interface HighlightCard {
  coverUrl: string
  title: string
  author: string
  publishedAt: string
  excerpt: string
}

export const HighlightCard = ({
  coverUrl,
  title,
  author,
  publishedAt,
  excerpt
}: HighlightCard) => {
  const publishedDate = dayjs(publishedAt).format('MMM DD')
  return (
    <Card className="flex p-4 gap-8 items-center">
      <div className="flex-1">
        <img src={coverUrl} className="rounded" />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <div className="flex gap-2">
          <Badge>
            <Avatar className="w-4 h-4 mr-1">
              <AvatarFallback className="bg-blue-800" />
            </Avatar>
            {author}
          </Badge>
          <Badge>
            <CalendarIcon size={14} className="mr-1" />
            {publishedDate}
          </Badge>
        </div>
        <p className="leading-8">{excerpt}</p>
      </div>
    </Card>
  )
}
