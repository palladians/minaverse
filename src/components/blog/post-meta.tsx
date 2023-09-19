import dayjs from 'dayjs'
import { CalendarIcon } from 'lucide-react'
import { readingTime } from 'reading-time-estimator'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getT } from '@/lib/i18n/server'
import { ApiPost } from '@/types'

interface PostMetaProps {
  post: ApiPost
}

export const PostMeta = async ({ post }: PostMetaProps) => {
  const t = await getT()
  const publishedDate = dayjs(post.publishedAt).format('MMM DD')
  const readingTimeMin = readingTime(post.content).minutes
  return (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="outline">
        <Avatar className="w-4 h-4 mr-1">
          <AvatarFallback className="bg-blue-800" />
        </Avatar>
        {post.expand?.author.name}
      </Badge>
      <Badge variant="outline">
        <CalendarIcon size={14} className="mr-1" />
        {publishedDate}
      </Badge>
      <Badge variant="outline">
        {t('common.minRead', { min: String(readingTimeMin) })}
      </Badge>
    </div>
  )
}
