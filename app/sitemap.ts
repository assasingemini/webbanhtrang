import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

const BASE_URL = 'https://banhtrangtron.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const routes = [
    '',
    '/menu',
    '/tin-tuc',
    '/lien-he',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Post Routes
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const postRoutes = posts.map((post) => ({
    url: `${BASE_URL}/tin-tuc/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic Product Routes
  const products = await prisma.menuItem.findMany({
    select: {
      slug: true,
      createdAt: true,
    },
  });

  const productRoutes = products.map((product) => ({
    url: `${BASE_URL}/menu/${product.slug}`,
    lastModified: product.createdAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...postRoutes, ...productRoutes];
}
