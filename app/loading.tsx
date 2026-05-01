import ProductGridSkeleton from '@/components/ui/ProductGridSkeleton';
import BlogCardSkeleton from '@/components/ui/BlogCardSkeleton';

/**
 * loading.tsx – Next.js tự động hiển thị khi trang chủ đang fetch data
 * Giả lập layout giống page.tsx: Hero skeleton + Product grid + Blog grid
 */
export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Hero Skeleton */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 skeleton-shimmer" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-2xl space-y-6">
            {/* Badge */}
            <div className="skeleton-shimmer h-8 w-56 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
            {/* Title */}
            <div className="space-y-3">
              <div className="skeleton-shimmer h-12 w-full rounded-xl" style={{ background: 'rgba(255,255,255,0.15)' }} />
              <div className="skeleton-shimmer h-12 w-3/4 rounded-xl" style={{ background: 'rgba(255,255,255,0.15)' }} />
            </div>
            {/* Subtitle */}
            <div className="space-y-2">
              <div className="skeleton-shimmer h-5 w-full rounded-lg" style={{ background: 'rgba(255,255,255,0.10)' }} />
              <div className="skeleton-shimmer h-5 w-5/6 rounded-lg" style={{ background: 'rgba(255,255,255,0.10)' }} />
            </div>
            {/* Buttons */}
            <div className="flex gap-4">
              <div className="skeleton-shimmer h-14 w-44 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
              <div className="skeleton-shimmer h-14 w-48 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features bar skeleton */}
      <div className="py-4" style={{ background: '#A60817' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton-shimmer h-6 rounded-lg" style={{ background: 'rgba(255,255,255,0.15)' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Skeleton */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-3">
          <div className="skeleton-shimmer h-7 w-32 rounded-full mx-auto" />
          <div className="skeleton-shimmer h-8 w-72 rounded-xl mx-auto" />
          <div className="skeleton-shimmer h-4 w-96 rounded-lg mx-auto" />
        </div>
        <ProductGridSkeleton count={4} />
      </section>

      {/* Banner CTA Skeleton */}
      <section className="py-12" style={{ background: 'linear-gradient(135deg, #8A2F2C 0%, #A60817 50%, #FE5200 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="skeleton-shimmer h-8 w-80 rounded-xl mx-auto" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div className="skeleton-shimmer h-5 w-96 rounded-lg mx-auto" style={{ background: 'rgba(255,255,255,0.10)' }} />
          <div className="skeleton-shimmer h-12 w-52 rounded-full mx-auto" style={{ background: 'rgba(255,255,255,0.2)' }} />
        </div>
      </section>

      {/* Blog Section Skeleton */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 space-y-3">
          <div className="skeleton-shimmer h-7 w-40 rounded-full" />
          <div className="skeleton-shimmer h-8 w-56 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
