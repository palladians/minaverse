import NextImage from 'next/image'

import { PostMeta } from '@/components/blog/post-meta'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card } from '@/components/ui/card'
import { pocketbase } from '@/lib/pocketbase'
import { ApiPost } from '@/types'

interface HighlightCardProps {
  post: ApiPost
}

export const HighlightCard = ({ post }: HighlightCardProps) => {
  const highlightCoverImage = pocketbase.files.getUrl(post, post.coverImage)
  return (
    <Card className="flex p-4 gap-8 items-center">
      <div className="flex-1">
        <AspectRatio ratio={2.25}>
          <NextImage
            src={highlightCoverImage}
            className="rounded-lg h-full w-full object-cover"
            width={300}
            height={200}
            alt={post.title}
          />
        </AspectRatio>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <h2 className="text-3xl font-semibold">{post.title}</h2>
        <PostMeta post={post} />
        <p className="leading-8">{post.excerpt}</p>
      </div>
    </Card>
  )
}
