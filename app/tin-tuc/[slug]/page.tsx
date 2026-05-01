import Image from "next/image";
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeyword?: string | null;
  publishedAt: Date;
  updatedAt: Date;
}

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) return {};

  const post = await prisma.post.findUnique({
    where: { slug }
  }) as Post | null;

  if (!post) return {};

  const siteName = 'Bánh Tráng Trộn Ngon Cần Thơ';

  const parseVariables = (text: string) => {
    return text
      .replace(/%title%/g, post.title)
      .replace(/%sitename%/g, siteName)
      .replace(/%sep%/g, '-');
  };

  const metaTitle = post.seoTitle
    ? parseVariables(post.seoTitle)
    : `${post.title} | ${siteName}`;

  const metaDescription = post.seoDescription || post.excerpt;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `https://banhtrangtron.vercel.app/tin-tuc/${slug}`,
    }
  };
}

export default async function BlogPost({ params }: any) {
  const { slug } = await params;

  if (!slug) notFound();

  const post = await prisma.post.findUnique({
    where: { slug }
  }) as Post | null;

  if (!post) notFound();

  const title = post.title;
  const image = post.coverImage || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop";

  return (
    <article className="bg-white min-h-screen">
      <div className="relative w-full h-[40vh] md:h-[60vh] bg-neutral-900">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center max-w-4xl text-white">
            <div className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight shadow-md">
              {title}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div
          className="prose prose-lg md:prose-xl prose-orange prose-a:no-underline hover:prose-a:text-orange-600 max-w-none mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "image": [image],
            "datePublished": post.publishedAt.toISOString(),
            "dateModified": post.updatedAt.toISOString(),
            "author": [{
              "@type": "Person",
              "name": "Bánh Tráng Trộn Ngon Cần Thơ",
              "url": "https://banhtrangtron.vercel.app"
            }]
          })
        }}
      />
    </article>
  );
}
