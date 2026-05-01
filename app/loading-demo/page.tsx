'use client';

import { useState, useEffect, useCallback } from 'react';
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';
import BlogCardSkeleton from '@/components/ui/BlogCardSkeleton';
import ProductGridSkeleton from '@/components/ui/ProductGridSkeleton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ProductCard from '@/components/ui/ProductCard';

/* ── Dữ liệu giả để demo ── */
const FAKE_PRODUCTS = [
  { slug: 'banh-trang-tron-dac-biet', name: 'Bánh Tráng Trộn Đặc Biệt', description: 'Thập cẩm đầy đủ topping, cay vừa', price: 35000, imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop' },
  { slug: 'banh-trang-nuong', name: 'Bánh Tráng Nướng', description: 'Giòn rụm, phô mai, trứng cút', price: 25000, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop' },
  { slug: 'banh-trang-cuon', name: 'Bánh Tráng Cuốn', description: 'Cuốn tôm thịt tươi ngon', price: 30000, imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=600&auto=format&fit=crop' },
  { slug: 'banh-trang-me', name: 'Bánh Tráng Mè', description: 'Vừng đen thơm bùi, giòn tan', price: 20000, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop' },
];

export default function LoadingDemoPage() {
  /* State */
  const [showSpinner, setShowSpinner] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [products, setProducts] = useState<typeof FAKE_PRODUCTS | null>(null);

  /* Giả lập load sản phẩm (2 giây delay) */
  const simulateLoadProducts = useCallback(() => {
    setIsLoadingProducts(true);
    setProducts(null);
    setTimeout(() => {
      setProducts(FAKE_PRODUCTS);
      setIsLoadingProducts(false);
    }, 2000);
  }, []);

  /* Giả lập spinner (1.5 giây) */
  const simulateSpinner = useCallback(() => {
    setShowSpinner(true);
    setTimeout(() => setShowSpinner(false), 1500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Fullscreen Spinner Overlay */}
      {showSpinner && <LoadingSpinner text="Đang xử lý..." />}

      {/* Header */}
      <div style={{ background: '#A60817' }} className="pt-32 pb-12 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1
            className="text-4xl font-extrabold mb-3"
            style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}
          >
            🔥 Loading Demo
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Test các hiệu ứng loading: Skeleton, Spinner
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">

        {/* ── Section 1: Spinner Demo ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Loading Spinner</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Inline spinners */}
            {(['sm', 'md', 'lg'] as const).map((sz) => (
              <div key={sz} className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Size: {sz}</span>
                <LoadingSpinner fullScreen={false} size={sz} />
              </div>
            ))}
          </div>
          <button
            onClick={simulateSpinner}
            className="px-6 py-3 rounded-full text-white font-semibold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #A60817, #FE5200)' }}
          >
            🔥 Test Fullscreen Spinner (1.5s)
          </button>
        </section>

        {/* ── Section 2: Single Skeleton Cards ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Skeleton Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">ProductCardSkeleton</p>
              <ProductCardSkeleton />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">BlogCardSkeleton</p>
              <BlogCardSkeleton />
            </div>
          </div>
        </section>

        {/* ── Section 3: Product Grid Skeleton → Real Data ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">3. Skeleton → Data Transition</h2>
          <p className="text-gray-500 mb-6">Bấm nút để giả lập loading sản phẩm (2 giây delay)</p>

          <button
            onClick={simulateLoadProducts}
            disabled={isLoadingProducts}
            className="mb-8 px-6 py-3 rounded-full text-white font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #A60817, #FE5200)' }}
          >
            {isLoadingProducts ? '⏳ Đang tải...' : '🔄 Tải Sản Phẩm'}
          </button>

          {/* Grid: skeleton hoặc data */}
          {isLoadingProducts ? (
            <ProductGridSkeleton count={4} />
          ) : products ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-400 font-medium bg-white rounded-2xl border border-dashed">
              Bấm nút phía trên để bắt đầu demo
            </div>
          )}
        </section>

        {/* ── Section 4: Usage Guide ── */}
        <section className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📖 Cách Sử Dụng</h2>
          <div className="prose prose-sm max-w-none text-gray-600">
            <pre className="bg-gray-50 rounded-xl p-4 text-sm overflow-x-auto">{`// 1. Skeleton khi load danh sách sản phẩm
import ProductGridSkeleton from '@/components/ui/ProductGridSkeleton';

{isLoading ? <ProductGridSkeleton count={8} /> : <ProductList />}

// 2. Spinner khi submit form / chuyển trang
import LoadingSpinner from '@/components/ui/LoadingSpinner';

{isSubmitting && <LoadingSpinner text="Đang gửi đơn..." />}

// 3. Inline spinner (không fullscreen)
<LoadingSpinner fullScreen={false} size="sm" />

// 4. Skeleton đơn lẻ
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';
import BlogCardSkeleton from '@/components/ui/BlogCardSkeleton';`}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}
