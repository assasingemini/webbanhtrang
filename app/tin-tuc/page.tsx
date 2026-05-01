import Link from "next/link";
import Image from "next/image";
import type { Metadata } from 'next';
import BlogCard from "@/components/ui/BlogCard";

export const dynamic = 'force-dynamic'; // Luôn fetch data mới từ DB

export const metadata: Metadata = {
  title: 'Blog Review & Tin Tức Bánh Tráng Trộn Ngon Cần Thơ',
  description: 'Tổng hợp chia sẻ, review đánh giá các loại bánh tráng trộn ngon nhất tại Cần Thơ. Kiến thức 100% hữu ích cho tín đồ ăn vặt.',
};

import { prisma } from "@/lib/prisma";

export default async function BlogListing() {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: 'desc' }
  });

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Page Header */}
      <div style={{ background: '#A60817' }} className="pt-32 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(255,178,0,0.2)', border: '1px solid #FFB200', color: '#FFB200' }}
          >
            📝 Tin Tức & Review
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}
          >
            Góc Review & Tin Tức <span style={{ color: '#FFB200' }}>Ẩm Thực Mới</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Khám phá những bài viết hay nhất về văn hóa ăn vặt Cần Thơ, bí quyết nhận diện bánh tráng chuẩn vị Tây Ninh.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map(post => (
                <BlogCard key={post.id} post={{ ...post, publishedAt: post.publishedAt.toISOString() }} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-xl text-gray-500 font-medium whitespace-pre-wrap">Hiện tại chuyên mục tin tức đang được cập nhật.{"\n"}Vui lòng quay lại sau!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
