'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const coverImage = formData.get('coverImage') as string;
  const tagsRaw = formData.get('tags') as string;
  const slug = formData.get('slug') as string || generateSlug(title);
  const seoTitle = formData.get('seoTitle') as string | null;
  const seoDescription = formData.get('seoDescription') as string | null;
  const seoKeyword = formData.get('seoKeyword') as string | null;
  const tags = tagsRaw
    ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  try {
    await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        tags,
        seoTitle,
        seoDescription,
        seoKeyword,
      },
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return { error: 'Không thể tạo bài viết. Hãy kiểm tra slug phải là duy nhất.' };
  }

  revalidatePath('/admin/posts');
  revalidatePath('/tin-tuc');
  redirect('/admin/posts');
}

export async function updatePost(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const coverImage = formData.get('coverImage') as string;
  const tagsRaw = formData.get('tags') as string;
  const slug = formData.get('slug') as string;
  const seoTitle = formData.get('seoTitle') as string | null;
  const seoDescription = formData.get('seoDescription') as string | null;
  const seoKeyword = formData.get('seoKeyword') as string | null;
  const tags = tagsRaw
    ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        tags,
        seoTitle,
        seoDescription,
        seoKeyword,
      },
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return { error: 'Không thể cập nhật bài viết.' };
  }

  revalidatePath('/admin/posts');
  revalidatePath('/tin-tuc');
  revalidatePath(`/tin-tuc/${slug}`);
  redirect('/admin/posts');
}

export async function deletePost(id: number) {
  try {
    await prisma.post.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return { error: 'Không thể xoá bài viết.' };
  }

  revalidatePath('/admin/posts');
  revalidatePath('/tin-tuc');
}
