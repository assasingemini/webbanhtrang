'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const imageUrl = formData.get('imageUrl') as string;
  const category = formData.get('category') as string;
  const slug = formData.get('slug') as string;
  const isAvailable = formData.get('isAvailable') === 'true';

  try {
    await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        category,
        slug,
        isAvailable,
      },
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return { error: 'Failed to create product. Make sure the slug is unique.' };
  }

  revalidatePath('/admin/products');
  revalidatePath('/menu');
  revalidatePath('/');
  redirect('/admin/products');
}

export async function updateProduct(id: number, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const imageUrl = formData.get('imageUrl') as string;
  const category = formData.get('category') as string;
  const slug = formData.get('slug') as string;
  const isAvailable = formData.get('isAvailable') === 'true';

  try {
    await prisma.menuItem.update({
      where: { id },
      data: {
        name,
        description,
        price,
        imageUrl,
        category,
        slug,
        isAvailable,
      },
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return { error: 'Failed to update product.' };
  }

  revalidatePath('/admin/products');
  revalidatePath('/menu');
  redirect('/admin/products');
}

export async function deleteProduct(id: number) {
  try {
    await prisma.menuItem.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return { error: 'Failed to delete product.' };
  }

  revalidatePath('/admin/products');
  revalidatePath('/menu');
}
