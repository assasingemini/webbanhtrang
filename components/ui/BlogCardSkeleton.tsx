/**
 * BlogCardSkeleton – Skeleton loading giả lập BlogCard
 * Layout khớp với BlogCard thật (h-48 image, date, title, excerpt, link).
 */
export default function BlogCardSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden bg-white"
      style={{ boxShadow: '0 4px 20px rgba(166,8,23,0.06)' }}
    >
      {/* Image placeholder */}
      <div className="skeleton-shimmer h-48 w-full" />

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Date */}
        <div className="skeleton-shimmer h-3 w-24 rounded-lg" />

        {/* Title line 1 */}
        <div className="skeleton-shimmer h-5 w-full rounded-lg" />

        {/* Title line 2 */}
        <div className="skeleton-shimmer h-5 w-3/4 rounded-lg" />

        {/* Excerpt */}
        <div className="space-y-2">
          <div className="skeleton-shimmer h-4 w-full rounded-lg" />
          <div className="skeleton-shimmer h-4 w-5/6 rounded-lg" />
        </div>

        {/* Read more link */}
        <div className="skeleton-shimmer h-4 w-20 rounded-lg" />
      </div>
    </div>
  );
}
