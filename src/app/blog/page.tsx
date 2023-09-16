import { BlogCard } from '@/components/blog/blog-card'
import { HighlightCard } from '@/components/blog/highlight-card'
import { getT } from '@/lib/i18n/server'

const BlogPage = async () => {
  const t = await getT()
  return (
    <div className="max-w-[72rem] mx-auto flex flex-1 flex-col gap-8">
      <h1 className="text-2xl font-semibold" data-testid="transactions__header">
        {t('common.blog')}
      </h1>
      <HighlightCard
        coverUrl="https://images.mirror-media.xyz/publication-images/CEdsbLXO7mxq67rFeZl0N.jpeg?height=640&width=1280"
        title="Rollup Flavors and Modular Scaling"
        author="Tomasz Marciniak"
        publishedAt="2023-09-14"
        excerpt="Rollups have the ecosystem buzzing with controversy. If you're scratching your head trying to make sense of it all, you’re not alone. We’ve noticed there aren’t many pieces of content that bring rollup architectures together in a digestible way, so we’ve decided to take a stab."
      />
      <div className="grid grid-cols-3 gap-8">
        <BlogCard
          author="Tomasz Marciniak"
          coverUrl="https://images.mirror-media.xyz/publication-images/fxlFognFRN_PGYTIVdIVt.jpeg?height=960&width=1920"
          excerpt="A look into the gameplay and design of Shoshin."
          publishedAt="2023-09-10"
          title="Shoshin: The Future Of Fighting Games"
        />
      </div>
    </div>
  )
}

export default BlogPage
