'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

/**
 * Lắng nghe thay đổi route — khi pathname thay đổi thì tắt spinner.
 */
function NavigationEvents({ onRouteChange }: { onRouteChange: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onRouteChange();
  }, [pathname, searchParams, onRouteChange]);

  return null;
}

/**
 * NavigationLoader – Hiển thị spinner 🔥 toàn màn hình mỗi khi chuyển trang.
 *
 * Cách hoạt động:
 * 1. Lắng nghe tất cả click trên <a> nội bộ (internal links)
 * 2. Hiển thị LoadingSpinner fullscreen
 * 3. Khi pathname thay đổi (trang mới đã load) → tắt spinner
 */
export default function NavigationLoader() {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  // Intercept click trên tất cả link nội bộ
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Tìm thẻ <a> gần nhất
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Bỏ qua: external link, anchor (#), download, target="_blank"
      if (
        href.startsWith('http') ||
        href.startsWith('#') ||
        anchor.hasAttribute('download') ||
        anchor.getAttribute('target') === '_blank'
      ) {
        return;
      }

      // Chỉ show spinner cho internal navigation khác trang hiện tại
      if (href.startsWith('/') && href !== pathname) {
        setIsNavigating(true);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  // Safety timeout: nếu navigation kẹt > 8s thì tắt spinner
  useEffect(() => {
    if (!isNavigating) return;
    const timer = setTimeout(() => setIsNavigating(false), 8000);
    return () => clearTimeout(timer);
  }, [isNavigating]);

  return (
    <>
      {isNavigating && <LoadingSpinner text="Đang tải trang..." />}
      <Suspense fallback={null}>
        <NavigationEvents onRouteChange={() => setIsNavigating(false)} />
      </Suspense>
    </>
  );
}
