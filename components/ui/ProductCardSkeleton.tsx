/**
 * ProductCardSkeleton – Skeleton loading giả lập ProductCard
 * Hiệu ứng shimmer chạy từ trái sang phải, kích thước khớp ProductCard thật.
 */
export default function ProductCardSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden bg-white"
      style={{ boxShadow: '0 4px 20px rgba(166,8,23,0.06)' }}
    >
      {/* Image placeholder */}
      <div className="skeleton-shimmer h-52 w-full" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="skeleton-shimmer h-5 w-3/4 rounded-lg" />

        {/* Description line 1 */}
        <div className="skeleton-shimmer h-4 w-full rounded-lg" />

        {/* Description line 2 */}
        <div className="skeleton-shimmer h-4 w-5/6 rounded-lg" />

        {/* Price + Button row */}
        <div className="flex items-center justify-between pt-1">
          <div className="skeleton-shimmer h-6 w-24 rounded-lg" />
          <div className="skeleton-shimmer h-9 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}
