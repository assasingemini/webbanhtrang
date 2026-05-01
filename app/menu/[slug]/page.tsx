import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone, Clock, ShieldCheck, ArrowLeft, Star } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import AddToCartSection from "../../../components/ui/AddToCartSection";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  const [product, config] = await Promise.all([
    prisma.menuItem.findUnique({ where: { slug } }),
    prisma.langdingPage.findFirst({ where: { id: 1 } })
  ]);

  const heroPhone = (config as any)?.heroPhone || '0123.456.789';

  if (!product) {
    notFound();
  }

  const relatedProducts = await prisma.menuItem.findMany({
    where: {
      category: product.category,
      NOT: { id: product.id },
    },
    take: 4,
  });

  const priceFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-[#A60817] transition-colors">Trang Chủ</Link>
            <ChevronRight size={14} />
            <Link href="/menu" className="hover:text-[#A60817] transition-colors">Thực Đơn</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl group">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-6 left-6">
               <div className="bg-[#A60817] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Nổi bật
               </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-[#FE5200] font-semibold text-sm mb-2 uppercase tracking-wider">
                <Star size={16} fill="#FE5200" />
                <span>{product.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
                {product.name}
              </h1>
              <div className="text-3xl font-black text-[#A60817] mb-6">
                {priceFormatter.format(product.price)}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 border-l-4 border-[#FFB200] pl-6 py-2 italic bg-gray-50 rounded-r-lg">
                "{product.description}"
              </p>
            </div>

            {/* Add to Cart Section (Client Component) */}
            <AddToCartSection product={{
              id: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              slug: product.slug
            }} />

            {/* Shrunk Contact/Action Section */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-[#FE5200]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Ship hỏa tốc 30p</p>
                  <a href={`tel:${heroPhone.replace(/\D/g, '')}`} className="text-sm font-bold text-gray-900 hover:text-[#A60817]">{heroPhone}</a>
                </div>
              </div>
              <div className="h-8 w-[1px] bg-gray-200 hidden sm:block"></div>
              <Link
                href="/lien-he"
                className="text-sm font-bold text-[#A60817] hover:underline"
              >
                Liên hệ chúng tôi
              </Link>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <ShieldCheck className="text-green-500" size={24} />
                  <span className="text-sm font-medium text-gray-700">Nguyên liệu sạch 100%</span>
               </div>
               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <Clock className="text-blue-500" size={24} />
                  <span className="text-sm font-medium text-gray-700">Giao hàng siêu tốc</span>
               </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-be-vietnam-pro), "Be Vietnam Pro", sans-serif' }}>
                  Có thể bạn cũng thích
                </h2>
                <div className="h-1.5 w-20 bg-[#A60817] mt-2 rounded-full"></div>
              </div>
              <Link href="/menu" className="text-[#A60817] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Xem tất cả <ChevronRight size={18} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
        
        {/* Back Link */}
        <div className="mt-16 text-center">
            <Link 
              href="/menu" 
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#A60817] transition-all font-medium py-2 px-4 rounded-full border border-gray-200 hover:border-[#A60817]"
            >
              <ArrowLeft size={16} /> Quay lại thực đơn
            </Link>
        </div>
      </div>
    </div>
  );
}
