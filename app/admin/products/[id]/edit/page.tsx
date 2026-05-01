import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductForm from '../../ProductForm';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await prisma.menuItem.findUnique({
    where: { id: productId },
  });

  if (!product) {
    notFound();
  }

  return <ProductForm initialData={product} />;
}
