import NextImage from 'next/image'

import { Card } from '@/components/ui/card'
import { pocketbase } from '@/lib/pocketbase'
import { ApiPost } from '@/types'

import { PostMeta } from './post-meta'
import { AspectRatio } from '../ui/aspect-ratio'

interface BlogCardProps {
  post: ApiPost
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const highlightCoverImage = pocketbase.files.getUrl(post, post.coverImage)
  return (
    <Card>
      <AspectRatio ratio={2.25}>
        <NextImage
          src={highlightCoverImage}
          className="rounded-t-lg h-full w-full object-cover"
          width={300}
          height={200}
          alt={post.title}
        />
      </AspectRatio>
      <div className="flex flex-col p-4 gap-2">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <PostMeta post={post} />
        <p className="leading-7">{post.excerpt}</p>
      </div>
    </Card>
  )
}
