import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PostForm from '../../PostForm';

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  if (isNaN(postId)) notFound();

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) notFound();

  return (
    <PostForm
      initialData={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        tags: post.tags,
      }}
    />
  );
}
