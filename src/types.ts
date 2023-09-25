export type ApiPost = {
  id: string
  slug: string
  coverImage: string
  title: string
  expand?: {
    author: {
      name: string
    }
  }
  publishedAt: string
  excerpt: string
  content: string
}
