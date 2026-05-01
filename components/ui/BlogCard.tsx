import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    publishedAt: string;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden bg-white group transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: '0 4px 20px rgba(166,8,23,0.10)' }}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={post.coverImage || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop"}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5">
        <div
          className="flex items-center gap-2 text-xs text-gray-400 mb-2"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <Calendar size={13} style={{ color: '#FE5200' }} />
          {new Date(post.publishedAt).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </div>
        <h3
          className="font-semibold text-gray-800 mb-2 line-clamp-2"
          style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}
        >
          {post.title}
        </h3>
        <p
          className="text-sm text-gray-500 mb-4 line-clamp-2"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {post.excerpt}
        </p>
        <Link
          href={`/tin-tuc/${post.slug}`}
          className="flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
          style={{ color: '#A60817', fontFamily: 'Inter, sans-serif' }}
        >
          Đọc Thêm <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
