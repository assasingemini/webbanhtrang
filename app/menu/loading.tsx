import ProductGridSkeleton from '@/components/ui/ProductGridSkeleton';

/**
 * loading.tsx – Hiển thị khi trang Menu đang fetch data từ DB
 * Layout khớp: header đỏ + category skeleton + product grid skeleton
 */
export default function MenuLoading() {
  return (
    <div className="bg-gray-50 min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Page Header */}
      <div style={{ background: '#A60817' }} className="pt-32 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="skeleton-shimmer h-7 w-28 rounded-full mx-auto" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div className="skeleton-shimmer h-12 w-80 rounded-xl mx-auto" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div className="skeleton-shimmer h-5 w-96 rounded-lg mx-auto" style={{ background: 'rgba(255,255,255,0.10)' }} />
        </div>
      </div>

      {/* Menu Categories Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col gap-16">
          {/* 2 category sections */}
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx}>
              {/* Category title */}
              <div className="flex items-center gap-4 mb-8">
                <div className="skeleton-shimmer h-9 w-48 rounded-xl" />
              </div>
              {/* Product grid */}
              <ProductGridSkeleton count={4} />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button Skeleton */}
      <div className="py-12 text-center">
        <div className="skeleton-shimmer h-14 w-52 rounded-full mx-auto" />
      </div>
    </div>
  );
}
