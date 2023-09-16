import dayjs from 'dayjs'
import { CalendarIcon } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

interface BlogCardProps {
  coverUrl: string
  title: string
  author: string
  publishedAt: string
  excerpt: string
}

export const BlogCard = ({
  coverUrl,
  title,
  author,
  publishedAt,
  excerpt
}: BlogCardProps) => {
  const publishedDate = dayjs(publishedAt).format('MMM DD')
  return (
    <Card>
      <img src={coverUrl} className="rounded-t" />
      <div className="flex flex-col p-4 gap-2">
        <h3 className="text-xl font-semibold">{title}</h3>
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
        <p>{excerpt}</p>
      </div>
    </Card>
  )
}
