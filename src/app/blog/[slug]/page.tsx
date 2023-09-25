import { Metadata } from 'next'
import NextImage from 'next/image'

import { PostMeta } from '@/components/blog/post-meta'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { pocketbase } from '@/lib/pocketbase'
import { ApiPost } from '@/types'

import styles from './styles.module.css'

export const generateMetadata = async ({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const post: ApiPost = await pocketbase
    .collection('blog_posts')
    .getFirstListItem(`slug="${params.slug}"`, { expand: 'author' })
  return {
    title: `${post.title} - Minaverse Blog`,
    description: post.excerpt,
    openGraph: {
      images: pocketbase.files.getUrl(post, post.coverImage),
      description: post.excerpt
    }
  }
}

interface BlogPostPageProps {
  params: { slug: string }
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const post: ApiPost = await pocketbase
    .collection('blog_posts')
    .getFirstListItem(`slug="${params.slug}"`, { expand: 'author' })
  const highlightCoverImage = pocketbase.files.getUrl(post, post.coverImage)
  return (
    <div className="max-w-[48rem] mx-auto flex flex-1 flex-col gap-8">
      <AspectRatio ratio={2.25}>
        <NextImage
          src={highlightCoverImage}
          className="rounded h-full w-full object-cover"
          width={600}
          height={400}
          alt={post.title}
        />
      </AspectRatio>
      <h1 className="text-3xl font-semibold">{post.title}</h1>
      <PostMeta post={post} />
      <article
        dangerouslySetInnerHTML={{ __html: post.content }}
        className={styles.article}
      />
    </div>
  )
}

export default BlogPostPage
