import ProductCardSkeleton from './ProductCardSkeleton';

interface ProductGridSkeletonProps {
  /** Số lượng skeleton cards hiển thị (default: 4) */
  count?: number;
}

/**
 * ProductGridSkeleton – Grid nhiều skeleton cards
 * Dùng khi loading danh sách sản phẩm (trang menu, trang chủ).
 */
export default function ProductGridSkeleton({ count = 4 }: ProductGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
