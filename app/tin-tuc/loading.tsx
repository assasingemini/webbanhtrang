import BlogCardSkeleton from '@/components/ui/BlogCardSkeleton';

/**
 * loading.tsx – Hiển thị khi trang Tin Tức đang fetch data từ DB
 * Layout khớp: header đỏ + blog grid skeleton
 */
export default function TinTucLoading() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Page Header */}
      <div style={{ background: '#A60817' }} className="pt-32 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="skeleton-shimmer h-7 w-36 rounded-full mx-auto" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div className="skeleton-shimmer h-12 w-[28rem] rounded-xl mx-auto" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div className="skeleton-shimmer h-5 w-[32rem] rounded-lg mx-auto" style={{ background: 'rgba(255,255,255,0.10)' }} />
        </div>
      </div>

      {/* Blog Grid Skeleton */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
