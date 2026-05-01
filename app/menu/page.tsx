import ProductCard from "@/components/ui/ProductCard";
import type { Metadata } from 'next';
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: 'Thực Đơn Bánh Tráng Trộn Ngon Cần Thơ | Giá Rẻ, Đa Dạng',
  description: 'Khám phá hơn 20 loại bánh tráng trộn, nướng, cuốn tại tiệm ngon nhất Ninh Kiều Cần Thơ. Giá chỉ từ 15k. Xem ngay menu!',
};

export default async function MenuPage() {
  const menuItems = await prisma.menuItem.findMany({
    where: { isAvailable: true },
    orderBy: { category: 'asc' }
  });

  // Group items by category
  const categories = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  const MENU_SECTIONS = Object.entries(categories).map(([name, items]) => ({
    category: name,
    items
  }));

  return (
    <div className="bg-gray-50 min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Page Header */}
      <div style={{ background: '#A60817' }} className="pt-32 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(255,178,0,0.2)', border: '1px solid #FFB200', color: '#FFB200' }}
          >
            🍽️ Thực Đơn
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}
          >
            Thực Đơn Đa Dạng
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Giao hàng siêu tốc khu vực Cần Thơ. Đặt món ngay để thưởng thức hương vị đặc trưng!
          </p>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col gap-16">
          {MENU_SECTIONS.length > 0 ? (
            MENU_SECTIONS.map((section, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-4 mb-8">
                  <h2
                    className="text-3xl font-bold text-gray-900 pb-2 border-b-4 inline-block"
                    style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif', borderColor: '#A60817' }}
                  >
                    {section.category}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {section.items.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
               <p className="text-xl text-gray-500 font-medium">Hiện tại thực đơn đang được cập nhật. Vui lòng quay lại sau!</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="py-12 text-center">
        <Link
          href="/lien-he"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #A60817, #FE5200)' }}
        >
          Đặt Hàng Ngay <ChevronRight size={18} />
        </Link>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            MENU_SECTIONS.flatMap(section =>
              section.items.map(product => ({
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": product.name,
                "image": product.imageUrl,
                "description": product.description,
                "brand": {
                  "@type": "Brand",
                  "name": "Bánh Tráng Trộn Cần Thơ"
                },
                "offers": {
                  "@type": "Offer",
                  "url": `https://banhtrangtronngoncantho.vn/menu/${product.slug}`,
                  "priceCurrency": "VND",
                  "price": product.price,
                  "itemCondition": "https://schema.org/NewCondition",
                  "availability": "https://schema.org/InStock"
                }
              }))
            )
          )
        }}
      />
    </div>
  );
}
