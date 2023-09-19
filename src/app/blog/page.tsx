import NextLink from 'next/link'

import { BlogCard } from '@/components/blog/blog-card'
import { HighlightCard } from '@/components/blog/highlight-card'
import { getT } from '@/lib/i18n/server'
import { pocketbase } from '@/lib/pocketbase'
import { ApiPost } from '@/types'

const BlogPage = async () => {
  const t = await getT()
  const posts: ApiPost[] = await pocketbase
    .collection('blog_posts')
    .getFullList({ expand: 'author', sort: '-publishedAt' })
  const [highlight, ...restOfPosts] = posts
  return (
    <div className="max-w-[72rem] mx-auto flex flex-1 flex-col gap-8">
      <h1 className="text-2xl font-semibold" data-testid="transactions__header">
        {t('common.blog')}
      </h1>
      <NextLink href={`/blog/${highlight.slug}`}>
        <HighlightCard post={highlight} />
      </NextLink>
      <div className="grid grid-cols-3 gap-8">
        {restOfPosts?.map((post) => (
          <NextLink key={post.id} href={`/blog/${post.slug}`}>
            <BlogCard post={post} />
          </NextLink>
        ))}
      </div>
    </div>
  )
}

export default BlogPage