'use client'

import { BlogPage } from '@/pages/Blog'

export default function BlogPost({ params }: { params: { slug: string } }) {
  return <BlogPage initialSlug={params.slug} />
}